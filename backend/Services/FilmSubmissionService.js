const { withTransaction, query } = require('../Utils/db');
const { HttpError } = require('../Utils/http');
const { uploadVideo, getVideoStatus } = require('./youtube.service');
const {
  sendSubmissionConfirmation,
  sendYouTubeUploadSuccessEmail,
  sendUploadFailureEmail,
} = require('./mail.service');
const MovieService = require('./MovieService');
const s3Service = require('./s3Service');

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

/**
 * Upload vers YouTube en arrière-plan (à partir du buffer déjà reçu).
 * Succès : met à jour youtube_url et envoie un email avec le lien.
 * Échec : envoie un email pour informer (pas de rollback, la vidéo reste enregistrée).
 */
async function doYoutubeUploadAndNotify(
  movieId,
  buffer,
  mimetype,
  movie,
  filmmaker,
) {
  if (!buffer) {
    // eslint-disable-next-line no-console
    console.error('Buffer vidéo manquant pour upload YouTube');
    try {
      await sendUploadFailureEmail({
        to: filmmaker.email,
        filmmakerName: `${filmmaker.first_name} ${filmmaker.last_name}`,
        movieTitle: movie.original_title,
      });
    } catch (mailErr) {
      // eslint-disable-next-line no-console
      console.error('Envoi email échec upload', mailErr);
    }
    return;
  }

  try {
    const youtubeId = await uploadVideo(buffer, mimetype, {
      title: movie.original_title || movie.english_title,
      description: movie.synopsis_original || movie.synopsis_english || '',
    });
    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

    await MovieService.setYoutubeUrl(movieId, youtubeUrl);

    await sendYouTubeUploadSuccessEmail({
      to: filmmaker.email,
      filmmakerName: `${filmmaker.first_name} ${filmmaker.last_name}`,
      movieTitle: movie.original_title,
      youtubeUrl,
    });
  } catch (err) {
    try {
      await sendUploadFailureEmail({
        to: filmmaker.email,
        filmmakerName: `${filmmaker.first_name} ${filmmaker.last_name}`,
        movieTitle: movie.original_title,
      });
    } catch (mailErr) {
      // eslint-disable-next-line no-console
      console.error('Envoi email échec upload', mailErr);
    }
    // eslint-disable-next-line no-console
    console.error('Échec upload YouTube (vidéo déjà enregistrée côté serveur)', err.message || err);
  }
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
      console.error('❌ Erreur lors du contrôle différé du statut YouTube :', err.message || err);
    }
  }, THIRTY_MINUTES);
}

async function submit({ movie, videoFile }) {
  if (!movie) {
    throw new HttpError(400, 'Missing movie payload');
  }

  validateMoviePayload(movie);

  const filmmaker = await verifyFilmmakerExists(movie.filmmaker_id);

  const hasUpload = videoFile && videoFile.buffer;
  const youtubeUrlFromPayload = movie.youtube_url || null;

  if (!hasUpload && !youtubeUrlFromPayload) {
    throw new HttpError(400, 'Either a video file or a youtube_url is required');
  }

  try {
    if (hasUpload) {
      // ——— Flux upload : envoyer la vidéo vers S3, insérer avec l'URL publique, mail confirmation, puis YouTube en arrière-plan ———
      const { url: videoUrl } = await s3Service.uploadFile(videoFile, 'videos');
      const youtubeBuffer = Buffer.from(videoFile.buffer);

      const result = await withTransaction(async (trx) => {
        const movieInsert = await trx.query(
          `INSERT INTO movie
            (original_title, english_title, duration, language, synopsis_original, synopsis_english, youtube_url, video_url, status, filmmaker_id)
           VALUES
            (:original_title, :english_title, :duration, :language, :synopsis_original, :synopsis_english, NULL, :video_url, 'in_process', :filmmaker_id)`,
          {
            original_title: movie.original_title,
            english_title: movie.english_title,
            duration: movie.duration,
            language: movie.language ?? null,
            synopsis_original: movie.synopsis_original ?? null,
            synopsis_english: movie.synopsis_english ?? null,
            video_url: videoUrl,
            filmmaker_id: movie.filmmaker_id,
          }
        );
        const movieId = movieInsert.insertId;
        return {
          movie_id: movieId,
          video_url: videoUrl,
          status: 'in_process',
        };
      });

      await sendSubmissionConfirmation({
        to: filmmaker.email,
        filmmakerName: `${filmmaker.first_name} ${filmmaker.last_name}`,
        movieTitle: movie.original_title,
      });

      setImmediate(() => {
        doYoutubeUploadAndNotify(
          result.movie_id,
          youtubeBuffer,
          videoFile.mimetype,
          movie,
          filmmaker
        ).catch(() => {});
      });

      return result;
    }

    // ——— Flux lien YouTube : insert avec youtube_url + envoi mail immédiat ———
    const result = await withTransaction(async (trx) => {
      const movieInsert = await trx.query(
        `INSERT INTO movie
          (original_title, english_title, duration, language, synopsis_original, synopsis_english, youtube_url, video_url, status, filmmaker_id)
         VALUES
          (:original_title, :english_title, :duration, :language, :synopsis_original, :synopsis_english, :youtube_url, NULL, 'in_process', :filmmaker_id)`,
        {
          original_title: movie.original_title,
          english_title: movie.english_title,
          duration: movie.duration,
          language: movie.language ?? null,
          synopsis_original: movie.synopsis_original ?? null,
          synopsis_english: movie.synopsis_english ?? null,
          youtube_url: youtubeUrlFromPayload,
          filmmaker_id: movie.filmmaker_id,
        }
      );
      const movieId = movieInsert.insertId;

      await sendSubmissionConfirmation({
        to: filmmaker.email,
        filmmakerName: `${filmmaker.first_name} ${filmmaker.last_name}`,
        movieTitle: movie.original_title,
      });

      return {
        movie_id: movieId,
        youtube_url: youtubeUrlFromPayload,
        status: 'in_process',
      };
    });

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

