const { query } = require('../Utils/db');
const { getVideoStatus } = require('../Services/youtube.service');
const AdminFilmService = require('../Services/AdminFilmService');

function extractYoutubeIdFromUrl(youtubeUrl) {
  if (!youtubeUrl) return null;

  try {
    const url = new URL(youtubeUrl);

    const v = url.searchParams.get('v');
    if (v) return v;

    if (url.hostname.includes('youtu.be')) {
      return url.pathname.split('/').filter(Boolean).pop() || null;
    }

    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length) {
      return parts.pop();
    }
  } catch (e) {
    // URL invalide, on ignore simplement
  }

  return null;
}

async function runYoutubeStatusCheckOnce() {
  try {
    const movies = await query(
      `SELECT id, youtube_url
       FROM movie
       WHERE youtube_url IS NOT NULL
         AND status = 'in_process'`,
      {},
    );

    if (!movies || movies.length === 0) return;

    // On traite séquentiellement pour limiter la pression sur l'API YouTube
    // (facile à passer en parallèle plus tard si besoin).
    // eslint-disable-next-line no-restricted-syntax
    for (const row of movies) {
      const youtubeId = extractYoutubeIdFromUrl(row.youtube_url);
      if (!youtubeId) {
        // eslint-disable-next-line no-console
        console.error(
          'Impossible de déterminer le YouTube ID à partir de l’URL :',
          row.youtube_url,
        );
        // On passe simplement au suivant
        // eslint-disable-next-line no-continue
        continue;
      }

      try {
        const { uploadStatus, rejectionReason } = await getVideoStatus(
          youtubeId,
        );

        if (uploadStatus === 'processed') {
          await AdminFilmService.updateStatus(row.id, {
            status: 'approved',
          });
        } else if (uploadStatus === 'rejected') {
          await AdminFilmService.updateStatus(row.id, {
            status: 'rejected',
            decision_reason:
              rejectionReason || 'Rejetée par YouTube (vérification automatique).',
          });
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(
          '❌ Erreur lors du contrôle différé du statut YouTube :',
          err.message || err,
        );
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(
      '❌ Erreur globale du worker de statut YouTube :',
      err.message || err,
    );
  }
}

function startYoutubeStatusWorker({ intervalMs = 15 * 60 * 1000 } = {}) {
  // Premier passage différé pour laisser le serveur démarrer proprement.
  setTimeout(runYoutubeStatusCheckOnce, 2 * 60 * 1000);

  setInterval(runYoutubeStatusCheckOnce, intervalMs);
}

module.exports = { startYoutubeStatusWorker };

