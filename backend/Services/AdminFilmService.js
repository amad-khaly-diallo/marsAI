const { query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { sendStatusUpdate } = require('./mail.service');

async function list({ status, search }) {
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

  const rows = await query(
    `SELECT
        m.*,
        f.first_name AS filmmaker_first_name,
        f.last_name AS filmmaker_last_name,
        f.email AS filmmaker_email
     FROM movie m
     INNER JOIN filmmaker f ON f.id = m.filmmaker_id
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
    filmmaker: {
      id: row.filmmaker_id,
      first_name: row.filmmaker_first_name,
      last_name: row.filmmaker_last_name,
      email: row.filmmaker_email,
    },
  }));
}

async function getById(id) {
  const rows = await query(
    `SELECT
        m.*,
        f.first_name AS filmmaker_first_name,
        f.last_name AS filmmaker_last_name,
        f.email AS filmmaker_email
     FROM movie m
     INNER JOIN filmmaker f ON f.id = m.filmmaker_id
     WHERE m.id = :id`,
    { id }
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
    filmmaker: {
      id: row.filmmaker_id,
      first_name: row.filmmaker_first_name,
      last_name: row.filmmaker_last_name,
      email: row.filmmaker_email,
    },
  };
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

module.exports = {
  list,
  getById,
  updateStatus,
};

