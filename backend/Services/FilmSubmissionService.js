const { withTransaction, query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { uploadVideo, getVideoStatus } = require('./youtube.service');
const { sendSubmissionConfirmation } = require('./mail.service');

function validateMoviePayload(movie) {
  const required = ['original_title', 'english_title', 'duration', 'filmmaker_id'];
  const missing = required.filter((k) => !movie || movie[k] === undefined || movie[k] === null || movie[k] === '');
  if (missing.length) {
    throw new HttpError(400, 'Missing required movie fields', { missing });
  }
}

async function verifyFilmmakerExists(filmmakerId) {
  const rows = await query('SELECT id, email, first_name, last_name FROM filmmaker WHERE id = :id', { id: filmmakerId });
  if (!rows[0]) {
    throw new HttpError(404, 'Filmmaker not found');
  }
  return rows[0];
}

async function handleYoutubeUpload(videoFile, movie) {
  if (!videoFile || !videoFile.buffer) {
    throw new HttpError(400, 'Invalid video file');
  }

  const youtubeId = await uploadVideo(videoFile.buffer, videoFile.mimetype, {
    title: movie.original_title || movie.english_title,
    description: movie.synopsis_original || movie.synopsis_english || '',
  });

  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

function extractYoutubeIdFromUrl(youtubeUrl) {
  if (!youtubeUrl) return null;

  try {
    const url = new URL(youtubeUrl);

    // Formats classiques : https://www.youtube.com/watch?v=ID
    const v = url.searchParams.get('v');
    if (v) return v;

    // Format court : https://youtu.be/ID
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean).pop() || null;
    }

    // Autres formats (par ex. /shorts/ID)
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length) {
      return parts.pop();
    }
  } catch (e) {
    // URL invalide, on ignore simplement
  }

  return null;
}

/**
 * Programme un contrôle différé (30 min) du statut YouTube.
 * - Si uploadStatus === 'processed' => on passe le film en 'approved' et on envoie l'email.
 * - Si uploadStatus === 'rejected'  => on passe le film en 'rejected' avec la raison YouTube.
 * (Les autres statuts sont simplement ignorés.)
 */
function scheduleYoutubeApprovalCheck({ movieId, youtubeUrl }) {
  const THIRTY_MINUTES = 30 * 60 * 1000;

  setTimeout(async () => {
    const youtubeId = extractYoutubeIdFromUrl(youtubeUrl);
    if (!youtubeId) {
      // eslint-disable-next-line no-console
      console.error('Impossible de déterminer le YouTube ID à partir de l’URL :', youtubeUrl);
      return;
    }

    try {
      const { uploadStatus, rejectionReason } = await getVideoStatus(youtubeId);

      // Chargement tardif pour éviter les éventuels problèmes de dépendances circulaires
      // eslint-disable-next-line global-require
      const AdminFilmService = require('./AdminFilmService');

      if (uploadStatus === 'processed') {
        await AdminFilmService.updateStatus(movieId, { status: 'approved' });
      } else if (uploadStatus === 'rejected') {
        await AdminFilmService.updateStatus(movieId, {
          status: 'rejected',
          decision_reason: rejectionReason || 'Rejetée par YouTube.',
        });
      }
      // Autres statuts (uploaded, failed, etc.) : on ne fait rien automatiquement.
    } catch (err) {
      // On loggue simplement ; pas de throw dans un setTimeout
      // eslint-disable-next-line no-console
      console.error('Erreur lors du contrôle différé du statut YouTube :', err.message || err);
    }
  }, THIRTY_MINUTES);
}

async function submit({ movie, videoFile }) {
  if (!movie) {
    throw new HttpError(400, 'Missing movie payload');
  }

  validateMoviePayload(movie);

  // Vérifier que le filmmaker existe
  const filmmaker = await verifyFilmmakerExists(movie.filmmaker_id);

  let youtubeUrl = movie.youtube_url || null;

  // 1. Si fichier vidéo fourni, upload sur YouTube
  if (videoFile) {
    youtubeUrl = await handleYoutubeUpload(videoFile, movie);
  }

  // 2. Si pas de fichier et pas de youtube_url => erreur
  if (!youtubeUrl) {
    throw new HttpError(400, 'Either a video file or a youtube_url is required');
  }

  // 3. Transaction SQL : création movie uniquement + envoi mail
  try {
    const result = await withTransaction(async (trx) => {
      // Insert movie avec status in_process
      const movieInsert = await trx.query(
        `INSERT INTO movie
          (original_title, english_title, duration, language, synopsis_original, synopsis_english, youtube_url, status, filmmaker_id)
         VALUES
          (:original_title, :english_title, :duration, :language, :synopsis_original, :synopsis_english, :youtube_url, :status, :filmmaker_id)`,
        {
          original_title: movie.original_title,
          english_title: movie.english_title,
          duration: movie.duration,
          language: movie.language ?? null,
          synopsis_original: movie.synopsis_original ?? null,
          synopsis_english: movie.synopsis_english ?? null,
          youtube_url: youtubeUrl,
          status: 'in_process',
          filmmaker_id: movie.filmmaker_id,
        }
      );

      const movieId = movieInsert.insertId;

      // Envoi mail de confirmation (si ça jette, la transaction sera rollback)
      await sendSubmissionConfirmation({
        to: filmmaker.email,
        filmmakerName: `${filmmaker.first_name} ${filmmaker.last_name}`,
        movieTitle: movie.original_title,
      });

      return {
        movie_id: movieId,
        youtube_url: youtubeUrl,
        status: 'in_process',
      };
    });

    // 4. Planifier un contrôle automatique 30 minutes plus tard
    scheduleYoutubeApprovalCheck({
      movieId: result.movie_id,
      youtubeUrl: result.youtube_url,
    });

    return result;
  } catch (err) {
    if (err instanceof HttpError) {
      throw err;
    }
    throw new HttpError(500, 'Film submission failed', { cause: err.message });
  }
}

module.exports = {
  submit,
};

