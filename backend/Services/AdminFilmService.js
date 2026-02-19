const { query, withTransaction } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { sendStatusUpdate } = require('./mail.service');

async function list({ status, search, currentUser }) {
  const where = [];
  const params = {};

  if (status) {
    where.push('m.status = :status');
    params.status = status;
  }

  if (search) {
    where.push('(m.original_title LIKE :q OR m.english_title LIKE :q)');
    params.q = `%${search}%`;
  }

  const whereClause = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const isBasicAdmin = currentUser && currentUser.role === 'admin';

  let joinCurrentAdmin = '';
  if (isBasicAdmin) {
    // L'admin simple ne voit que les films qui lui sont assignés
    joinCurrentAdmin =
      'INNER JOIN admin_movie_assignment ama ON ama.movie_id = m.id AND ama.admin_id = :current_admin_id';
    params.current_admin_id = currentUser.id;
  }

  const rows = await query(
    `SELECT
        m.*,
        f.first_name AS filmmaker_first_name,
        f.last_name AS filmmaker_last_name,
        f.email AS filmmaker_email,
        COALESCE(a.reviewers_count, 0) AS reviewers_count,
        w.id AS winner_id,
        w.ranking AS winner_ranking,
        w.category AS winner_category,
        ${
          isBasicAdmin
            ? 'ama.rating AS my_rating, ama.comment AS my_comment, ama.flag AS my_flag'
            : 'NULL AS my_rating, NULL AS my_comment, NULL AS my_flag'
        }
     FROM movie m
     INNER JOIN filmmaker f ON f.id = m.filmmaker_id
     ${joinCurrentAdmin}
     LEFT JOIN (
       SELECT movie_id, COUNT(*) AS reviewers_count
       FROM admin_movie_assignment
       GROUP BY movie_id
     ) a ON a.movie_id = m.id
     LEFT JOIN winner w ON w.movie_id = m.id
     ${whereClause}
     ORDER BY m.id DESC`,
    params
  );

  return rows.map((row) => ({
    id: row.id,
    original_title: row.original_title,
    english_title: row.english_title,
    duration: row.duration,
    language: row.language,
    synopsis_original: row.synopsis_original,
    synopsis_english: row.synopsis_english,
    youtube_url: row.youtube_url,
    status: row.status,
    decision_reason: row.decision_reason,
    decision_at: row.decision_at,
    reviewers_count: row.reviewers_count,
    is_winner: !!row.winner_id,
    winner_ranking: row.winner_ranking ?? null,
    winner_category: row.winner_category ?? null,
    my_rating:
      typeof row.my_rating === 'number' ? row.my_rating : null,
    my_comment: row.my_comment ?? null,
    my_flag: row.my_flag ?? null,
    filmmaker: {
      id: row.filmmaker_id,
      first_name: row.filmmaker_first_name,
      last_name: row.filmmaker_last_name,
      email: row.filmmaker_email,
    },
  }));
}

async function getById(id, currentUser) {
  const params = { id };

  const isBasicAdmin = currentUser && currentUser.role === 'admin';

  let joinCurrentAdmin = '';
  if (isBasicAdmin) {
    joinCurrentAdmin =
      'LEFT JOIN admin_movie_assignment ama ON ama.movie_id = m.id AND ama.admin_id = :current_admin_id';
    params.current_admin_id = currentUser.id;
  }

  const rows = await query(
    `SELECT
        m.*,
        f.first_name AS filmmaker_first_name,
        f.last_name AS filmmaker_last_name,
        f.email AS filmmaker_email,
        w.id AS winner_id,
        w.ranking AS winner_ranking,
        w.category AS winner_category,
        ${
          isBasicAdmin
            ? 'ama.rating AS my_rating, ama.comment AS my_comment, ama.flag AS my_flag'
            : 'NULL AS my_rating, NULL AS my_comment, NULL AS my_flag'
        }
     FROM movie m
     INNER JOIN filmmaker f ON f.id = m.filmmaker_id
     LEFT JOIN winner w ON w.movie_id = m.id
     ${joinCurrentAdmin}
     WHERE m.id = :id`,
    params
  );

  const row = rows[0];
  if (!row) throw new HttpError(404, 'Movie not found');

  return {
    id: row.id,
    original_title: row.original_title,
    english_title: row.english_title,
    duration: row.duration,
    language: row.language,
    synopsis_original: row.synopsis_original,
    synopsis_english: row.synopsis_english,
    youtube_url: row.youtube_url,
    status: row.status,
    decision_reason: row.decision_reason,
    decision_at: row.decision_at,
    is_winner: !!row.winner_id,
    winner_ranking: row.winner_ranking ?? null,
    winner_category: row.winner_category ?? null,
    my_rating:
      typeof row.my_rating === 'number' ? row.my_rating : null,
    my_comment: row.my_comment ?? null,
    my_flag: row.my_flag ?? null,
    filmmaker: {
      id: row.filmmaker_id,
      first_name: row.filmmaker_first_name,
      last_name: row.filmmaker_last_name,
      email: row.filmmaker_email,
    },
  };
}

async function updateWinner(id, { is_winner }) {
  const flag = !!is_winner;

  const movie = await getById(id, null);

  if (movie.status !== 'selected' && flag) {
    throw new HttpError(400, 'Seuls les films sélectionnés peuvent être gagnants.');
  }

  // Compte actuel de gagnants (tous films confondus)
  const countRows = await query('SELECT COUNT(*) AS cnt FROM winner', {});
  const currentCount =
    countRows[0] && typeof countRows[0].cnt === 'number' ? countRows[0].cnt : 0;

  if (flag) {
    if (!movie.is_winner && currentCount >= 6) {
      throw new HttpError(400, 'Vous avez déjà 6 films gagnants.');
    }

    if (!movie.is_winner) {
      // Nouveau gagnant : on lui attribue le prochain ranking
      const rankRows = await query('SELECT COALESCE(MAX(ranking), 0) AS max_rank FROM winner', {});
      const nextRank =
        rankRows[0] && typeof rankRows[0].max_rank === 'number'
          ? rankRows[0].max_rank + 1
          : currentCount + 1;

      await query(
        `INSERT INTO winner (ranking, category, movie_id)
         VALUES (:ranking, :category, :movie_id)`,
        {
          ranking: nextRank,
          category: 'Grand Prix',
          movie_id: id,
        }
      );
    }
  } else if (movie.is_winner) {
    // On retire simplement le film de la table winner
    await query('DELETE FROM winner WHERE movie_id = :movie_id', { movie_id: id });
  }

  return getById(id, null);
}

async function updateStatus(id, { status, decision_reason }) {
  const allowed = ['in_process', 'approved', 'rejected', 'selected'];
  if (!status || !allowed.includes(status)) {
    throw new HttpError(400, 'Invalid status', { allowed });
  }

  const movie = await getById(id); // récupère aussi le filmmaker

  await query(
    `UPDATE movie
     SET status = :status,
         decision_reason = :decision_reason,
         decision_at = CASE
           WHEN :status IN ('approved', 'rejected', 'selected') THEN NOW()
           ELSE NULL
         END
     WHERE id = :id`,
    {
      id,
      status,
      decision_reason: decision_reason ?? null,
    }
  );

  // On envoie l'email en fonction du nouveau statut (si concerné)
  await sendStatusUpdate({
    to: movie.filmmaker.email,
    filmmakerName: `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`,
    movieTitle: movie.original_title,
    status,
    decisionReason: decision_reason,
  });

  // On renvoie l’état mis à jour (en relisant)
  return getById(id);
}

async function upsertReview(movieId, { rating, comment }, currentUser) {
  if (!currentUser) {
    throw new HttpError(401, 'User not authenticated');
  }

  const adminId = currentUser.id;

  let normalizedRating = null;
  if (rating !== undefined && rating !== null && rating !== '') {
    const num = Number(rating);
    if (!Number.isFinite(num) || num < 1 || num > 10) {
      throw new HttpError(400, 'Rating must be a number between 1 and 10');
    }
    normalizedRating = num;
  }

  const textComment =
    typeof comment === 'string' && comment.trim().length ? comment.trim() : null;

  await query(
    `INSERT INTO admin_movie_assignment (admin_id, movie_id, rating, comment)
     VALUES (:admin_id, :movie_id, :rating, :comment)
     ON DUPLICATE KEY UPDATE
       rating = VALUES(rating),
       comment = VALUES(comment)`,
    {
      admin_id: adminId,
      movie_id: movieId,
      rating: normalizedRating,
      comment: textComment,
    }
  );

  return {
    movie_id: movieId,
    admin_id: adminId,
    rating: normalizedRating,
    comment: textComment,
  };
}

async function updateFlag(movieId, { flag }, currentUser) {
  if (!currentUser) {
    throw new HttpError(401, 'User not authenticated');
  }

  if (currentUser.role !== 'admin') {
    throw new HttpError(403, 'Only basic admins can manage flags');
  }

  const adminId = currentUser.id;

  let normalizedFlag = null;
  if (flag === null || flag === undefined || flag === '') {
    normalizedFlag = null;
  } else if (flag === 'green' || flag === 'yellow' || flag === 'red') {
    normalizedFlag = flag;
  } else {
    throw new HttpError(400, 'Invalid flag', {
      allowed: ['green', 'yellow', 'red', null],
    });
  }

  await query(
    `UPDATE admin_movie_assignment
     SET flag = :flag
     WHERE admin_id = :admin_id AND movie_id = :movie_id`,
    {
      flag: normalizedFlag,
      admin_id: adminId,
      movie_id: movieId,
    }
  );

  return {
    movie_id: movieId,
    admin_id: adminId,
    flag: normalizedFlag,
  };
}

async function listReviews(movieId) {
  const rows = await query(
    `SELECT
       ama.rating,
       ama.flag,
       ama.created_at,
       a.id AS admin_id,
       a.first_name,
       a.last_name
     FROM admin_movie_assignment ama
     INNER JOIN admins a ON a.id = ama.admin_id
     WHERE ama.movie_id = :movie_id
     ORDER BY a.last_name, a.first_name`,
    { movie_id: movieId }
  );

  return rows.map((row) => ({
    admin_id: row.admin_id,
    first_name: row.first_name,
    last_name: row.last_name,
    rating: typeof row.rating === 'number' ? row.rating : null,
    flag: row.flag ?? null,
    created_at: row.created_at,
  }));
}

async function distributeToAdmins(minReviewers = 2) {
  const reviewersRequired = Number.isInteger(minReviewers) && minReviewers > 0 ? minReviewers : 2;

  return withTransaction(async (db) => {
    const admins = await db.query('SELECT id FROM admins WHERE role = "admin"');
    if (!admins.length) {
      throw new HttpError(400, 'Aucun compte admin disponible pour la répartition');
    }

    const movies = await db.query('SELECT id FROM movie');

    if (!movies.length) {
      return { moviesCount: 0, assignmentsCreated: 0 };
    }

    const countsRows = await db.query(
      'SELECT admin_id, COUNT(*) AS cnt FROM admin_movie_assignment GROUP BY admin_id'
    );

    const assignCounts = new Map();
    admins.forEach((a) => {
      assignCounts.set(a.id, 0);
    });

    countsRows.forEach((row) => {
      if (assignCounts.has(row.admin_id)) {
        assignCounts.set(row.admin_id, row.cnt);
      }
    });

    let assignmentsCreated = 0;

    for (const movie of movies) {
      const existingRows = await db.query(
        'SELECT admin_id FROM admin_movie_assignment WHERE movie_id = :movie_id',
        { movie_id: movie.id }
      );

      const existingAdminIds = new Set(existingRows.map((r) => r.admin_id));
      let needed = reviewersRequired - existingAdminIds.size;

      if (needed <= 0) continue;

      while (needed > 0) {
        const availableAdmins = admins.filter((a) => !existingAdminIds.has(a.id));

        if (!availableAdmins.length) break;

        availableAdmins.sort(
          (a, b) => (assignCounts.get(a.id) || 0) - (assignCounts.get(b.id) || 0)
        );

        const chosen = availableAdmins[0];

        await db.query(
          'INSERT IGNORE INTO admin_movie_assignment (admin_id, movie_id) VALUES (:admin_id, :movie_id)',
          {
            admin_id: chosen.id,
            movie_id: movie.id,
          }
        );

        existingAdminIds.add(chosen.id);
        assignCounts.set(chosen.id, (assignCounts.get(chosen.id) || 0) + 1);
        assignmentsCreated += 1;
        needed -= 1;
      }
    }

    return {
      moviesCount: movies.length,
      assignmentsCreated,
      reviewersRequired,
    };
  });
}

module.exports = {
  list,
  getById,
  updateStatus,
  distributeToAdmins,
  upsertReview,
  updateFlag,
  listReviews,
  updateWinner,
};

