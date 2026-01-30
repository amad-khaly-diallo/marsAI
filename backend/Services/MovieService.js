const { get } = require('../Routes');
const { query, withTransaction } = require('../Utils/db');
const { HttpError } = require('../Utils/http');

function mapMovie(row) {
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
    filmmaker_id: row.filmmaker_id,
  };
}

async function list() {
  const rows = await query('SELECT * FROM movie ORDER BY id DESC');
  return rows.map(mapMovie);
}

async function getById(id) {
  const rows = await query('SELECT * FROM movie WHERE id = :id', { id });
  const row = rows[0];
  if (!row) throw new HttpError(404, 'Movie not found');
  return mapMovie(row);
}

async function create(payload) {
  const required = ['original_title', 'english_title', 'duration', 'youtube_url', 'filmmaker_id'];
  const missing = required.filter((k) => payload[k] === undefined || payload[k] === null || payload[k] === '');
  if (missing.length) throw new HttpError(400, 'Missing required fields', { missing });

  const result = await query(
    `INSERT INTO movie
      (original_title, english_title, duration, language, synopsis_original, synopsis_english, youtube_url, status, filmmaker_id)
     VALUES
      (:original_title, :english_title, :duration, :language, :synopsis_original, :synopsis_english, :youtube_url, :status, :filmmaker_id)`,
    {
      original_title: payload.original_title,
      english_title: payload.english_title,
      duration: payload.duration,
      language: payload.language ?? null,
      synopsis_original: payload.synopsis_original ?? null,
      synopsis_english: payload.synopsis_english ?? null,
      youtube_url: payload.youtube_url,
      status: payload.status ?? 'in_process',
      filmmaker_id: payload.filmmaker_id,
    }
  );

  return getById(result.insertId);
}

async function update(id, payload) {
  await getById(id);
  await query(
    `UPDATE movie SET
      original_title = :original_title,
      english_title = :english_title,
      duration = :duration,
      language = :language,
      synopsis_original = :synopsis_original,
      synopsis_english = :synopsis_english,
      youtube_url = :youtube_url,
      status = :status,
      filmmaker_id = :filmmaker_id
     WHERE id = :id`,
    {
      id,
      original_title: payload.original_title ?? null,
      english_title: payload.english_title ?? null,
      duration: payload.duration ?? null,
      language: payload.language ?? null,
      synopsis_original: payload.synopsis_original ?? null,
      synopsis_english: payload.synopsis_english ?? null,
      youtube_url: payload.youtube_url ?? null,
      status: payload.status ?? null,
      filmmaker_id: payload.filmmaker_id ?? null,
    }
  );
  return getById(id);
}

async function remove(id) {
  await getById(id);
  await query('DELETE FROM movie WHERE id = :id', { id });
  return true;
}

async function listAssets(movieId) {
  await getById(movieId);
  return query('SELECT * FROM asset WHERE movie_id = :movieId ORDER BY id DESC', { movieId });
}

async function getAssetById(movieId, assetId) {
  await getById(movieId);
  return query('SELECT * FROM asset WHERE movie_id = :movieId AND id = :assetId', { movieId, assetId });
}

async function addAsset(movieId, payload) {
  await getById(movieId);
  const result = await query(
    `INSERT INTO asset (asset_type, file_path, file_format,movie_id)
     VALUES (:asset_type, :file_path, :file_format, :movie_id)`,
    {
      movie_id: movieId,
      asset_type: payload.asset_type ?? null,
      file_path: payload.file_path ?? null,
      file_format: payload.file_format ?? null,
    }
  );
  return getAssetById(movieId, result.insertId);
}



async function listCollaborators(movieId) {
  await getById(movieId);
  return query('SELECT * FROM collaborator WHERE movie_id = :movieId ORDER BY id DESC', { movieId });
}

/*{
      "civility": "Mr",
      "first_name": "Paul",
      "last_name": "Martin",
      "role": "Producer",
      "email": "paul.martin@example.com",
      "movie_id": 1
    }*/
async function addCollaborator(movieId, payload) {
  await getById(movieId);
  const result = await query(
    `INSERT INTO collaborator (civility, first_name, last_name, role, email, movie_id)
     VALUES (:civility, :first_name, :last_name, :role, :email, :movie_id)`,
    {
      movie_id: movieId,
      civility: payload.civility ?? null,
      first_name: payload.first_name ?? null,
      last_name: payload.last_name ?? null,
      role: payload.role ?? null,
      email: payload.email ?? null,
    }
  );
  return getMovieCollaboratorsById(movieId);
}

async function getMovieCollaboratorsById(id) {
  return query('SELECT * FROM collaborator WHERE movie_id = :id', { id });
}

async function listTags(movieId) {
  await getById(movieId);
  return query(
    `SELECT t.id, t.label
     FROM tag t
     INNER JOIN movie_tag mt ON mt.tag_id = t.id
     WHERE mt.movie_id = :movieId
     ORDER BY t.label ASC`,
    { movieId }
  );
}

async function addTag(movieId, label) {
  if (!label) throw new HttpError(400, 'Missing tag label');

  return withTransaction(async (trx) => {
    await getById(movieId);

    // Upsert tag by label (unique)
    let tagRows = await trx.query('SELECT id, label FROM tag WHERE label = :label', { label });
    let tagId;
    if (tagRows[0]) {
      tagId = tagRows[0].id;
    } else {
      const insertTag = await trx.query('INSERT INTO tag (label) VALUES (:label)', { label });
      tagId = insertTag.insertId;
    }

    // Link (ignore if already exists)
    try {
      await trx.query('INSERT INTO movie_tag (movie_id, tag_id) VALUES (:movieId, :tagId)', { movieId, tagId });
    } catch (err) {
      if (err && err.code !== 'ER_DUP_ENTRY') throw err;
    }

    return listTags(movieId);
  });
}

async function removeTag(movieId, tagId) {
  await getById(movieId);
  await query('DELETE FROM movie_tag WHERE movie_id = :movieId AND tag_id = :tagId', { movieId, tagId });
  return listTags(movieId);
}

async function getAiDeclaration(movieId) {
  await getById(movieId);
  const rows = await query('SELECT * FROM ai_declaration WHERE movie_id = :movieId', { movieId });
  return rows[0] || null;
}

async function upsertAiDeclaration(movieId, payload) {
  await getById(movieId);
  if (!payload || !payload.artwork_type) throw new HttpError(400, 'Missing artwork_type');

  return withTransaction(async (trx) => {
    const existing = await trx.query('SELECT id FROM ai_declaration WHERE movie_id = :movieId', { movieId });
    if (existing[0]) {
      await trx.query(
        `UPDATE ai_declaration SET
          artwork_type = :artwork_type,
          tech_stack = :tech_stack,
          methodology = :methodology
         WHERE movie_id = :movieId`,
        {
          movieId,
          artwork_type: payload.artwork_type,
          tech_stack: payload.tech_stack ?? null,
          methodology: payload.methodology ?? null,
        }
      );
    } else {
      await trx.query(
        `INSERT INTO ai_declaration (artwork_type, tech_stack, methodology, movie_id)
         VALUES (:artwork_type, :tech_stack, :methodology, :movieId)`,
        {
          movieId,
          artwork_type: payload.artwork_type,
          tech_stack: payload.tech_stack ?? null,
          methodology: payload.methodology ?? null,
        }
      );
    }
    return getAiDeclaration(movieId);
  });
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
  listAssets,
  addAsset,
  getAssetById,
  listCollaborators,
  addCollaborator,
  listTags,
  addTag,
  removeTag,
  getAiDeclaration,
  upsertAiDeclaration,
};

