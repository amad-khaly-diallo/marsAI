import { useEffect } from 'react';
import useSubmission from './useSubmission';
import useAsync from './useAsync';
import { trackEvent } from '../components/G-Analytics/GoogleAnalytics';

export default function useParticiperSubmit({
  // state pieces & setters from useParticiperState
  filmmaker,
  movie,
  movieVideo,
  collaborators,
  assets,
  tags,
  filmmakerId,
  movieId,
  setFilmmakerId,
  setMovieId,
  setAiSaved,
  setCollaboratorsSaved,
  setAssetsTagsSaved,
  setSubmitting,
  setError,
  setCurrentStep,
  // progress setters
  setMovieUploadProgress,
  setAssetsUploadProgress,
  // include aiDeclaration (used as fallback in submit handler)
  aiDeclaration,
  // validators
  validateFilmmaker,
  validateMovie,
  validateAiDeclaration,
  validateCollaborators,
  // translation helper
  currentStep,
  t,
}) {
  const submission = useSubmission();

  // --- operations using useAsync ---
  const filmmakerOp = useAsync(async (filmmakerLocal) => {
    const data = await submission.createFilmmaker(filmmakerLocal);
    setFilmmakerId(data.id);

    // Déclenchez l'événement de l'étape 1 ainsi que le nom du pays (pour la carte du monde de 120 pays)
    trackEvent('step_1_filmmaker', {
      country_origin: filmmakerLocal.country,
    });

    setCurrentStep(2);
    return data;
  });

  const movieOp = useAsync(async (localMovie) => {
    const payload = { ...localMovie, filmmaker_id: filmmakerId };
    // reset progress
    if (typeof setMovieUploadProgress === 'function') setMovieUploadProgress(0);

    const data = await submission.submitMovieWithProgress(
      payload,
      movieVideo,
      (pct) => {
        if (typeof setMovieUploadProgress === 'function')
          setMovieUploadProgress(pct);
      },
    );

    // ensure progress shown as complete briefly
    if (typeof setMovieUploadProgress === 'function')
      setMovieUploadProgress(100);

    setMovieId(data.movie_id);

    trackEvent('step_2_movie');

    setCurrentStep(3);
    return data;
  });

  const aiOp = useAsync(async (payload) => {
    await submission.saveAiDeclaration(movieId, payload);
    setAiSaved(true);

    const aiToolsUsed = payload.tools
      ? payload.tools.join(', ')
      : 'Non spécifié';

    // Déclenchement de l'événement de l'étape 3 avec les noms des outils d'IA
    trackEvent('step_3_ai', {
      ai_tool: aiToolsUsed,
    });

    setCurrentStep(4);
  });

  const collabOp = useAsync(async () => {
    if (!collaborators.length) {
      setCollaboratorsSaved(true);
      trackEvent('film_submission_complete');
      return;
    }
    await Promise.all(
      collaborators.map((c) => submission.addCollaborator(movieId, c)),
    );
    setCollaboratorsSaved(true);
    trackEvent('film_submission_complete');
  });

  const assetsOp = useAsync(async () => {
    const rawStills = Array.isArray(assets.stills) ? assets.stills : [];
    // On ne garde que les vrais File (avec propriété type) pour l'upload backend.
    const stillFiles = rawStills.filter(
      (item) =>
        item && typeof item === 'object' && typeof item.type === 'string',
    );

    if (stillFiles.length > 0 || assets.subtitle || assets.thumbnail) {
      stillFiles.forEach((file) => {
        if (!file.type || !file.type.startsWith('image/')) {
          throw new Error(t('error.assets.still.invalidType'));
        }
      });
      if (assets.thumbnail && !assets.thumbnail.type.startsWith('image/')) {
        throw new Error(t('error.assets.still.invalidType'));
      }
      if (assets.subtitle) {
        const name = assets.subtitle.name || '';
        if (!name.toLowerCase().endsWith('.srt')) {
          throw new Error(t('error.assets.subtitle.invalidType'));
        }
      }
    }

    // reset progress
    if (typeof setAssetsUploadProgress === 'function')
      setAssetsUploadProgress(0);

    const requests = [];
    if (stillFiles.length > 0 || assets.subtitle || assets.thumbnail)
      requests.push(
        submission.uploadAssetsWithProgress(
          movieId,
          stillFiles,
          assets.subtitle,
          (pct) => {
            if (typeof setAssetsUploadProgress === 'function')
              setAssetsUploadProgress(pct);
          },
          assets.thumbnail || null,
        ),
      );
    const cleanTags = (tags || [])
      .map((x) => x.trim())
      .filter((x) => x.length > 0);
    cleanTags.forEach((label) =>
      requests.push(submission.addTag(movieId, label)),
    );

    if (requests.length > 0) await Promise.all(requests);

    // ensure progress shown as complete briefly
    if (typeof setAssetsUploadProgress === 'function')
      setAssetsUploadProgress(100);

    setAssetsTagsSaved(true);
    trackEvent('step_4_assets');

    setCurrentStep(5);
  });

  // aggregate loading dans l'état global `submitting`,
  // mais uniquement pour l'étape courante (pour éviter qu'une étape
  // précédente laisse le bouton de la nouvelle étape bloqué en mode "loading").
  useEffect(() => {
    setSubmitting(
      !!(
        (currentStep === 1 && filmmakerOp.loading) ||
        (currentStep === 2 && movieOp.loading) ||
        (currentStep === 3 && aiOp.loading) ||
        (currentStep === 4 && assetsOp.loading) ||
        (currentStep === 5 && collabOp.loading)
      ),
    );
  }, [
    filmmakerOp.loading,
    movieOp.loading,
    aiOp.loading,
    assetsOp.loading,
    collabOp.loading,
    currentStep,
    setSubmitting,
  ]);

  // propagate async errors à l'état partagé `error`
  // et s'assurer que `submitting` est bien relâché pour permettre un nouvel essai.
  useEffect(() => {
    const opError =
      filmmakerOp.error ||
      movieOp.error ||
      aiOp.error ||
      collabOp.error ||
      assetsOp.error;
    if (opError) {
      setError(opError.message || String(opError));
      setSubmitting(false);
    }
  }, [
    filmmakerOp.error,
    movieOp.error,
    aiOp.error,
    collabOp.error,
    assetsOp.error,
    setError,
    setSubmitting,
  ]);

  // --- public handlers (validate synchronously, then delegate to useAsync.run) ---
  const handleSubmitFilmmaker = async (filmmakerLocal) => {
    setError(null);
    const validationError = validateFilmmaker(filmmakerLocal || filmmaker);
    if (validationError) {
      setSubmitting(false);
      return setError(validationError);
    }

    try {
      await filmmakerOp.run(filmmakerLocal || filmmaker);
    } catch (err) {
      setError(err.message || String(err));
      trackEvent('submit_step_error', {
        funnel_name: 'film_submission',
        step_number: 1,
        error_message: err.message || String(err),
      });
      setSubmitting(false);
    }
  };

  const handleSubmitMovie = async (movieLocal) => {
    if (!filmmakerId) return;
    setError(null);
    const validationError = validateMovie(movieLocal || movie);
    if (validationError) {
      setSubmitting(false);
      return setError(validationError);
    }

    const localMovie = movieLocal || movie;

    const hasYouTube =
      localMovie.youtube_url && localMovie.youtube_url.trim().length > 0;
    if (!movieVideo && !hasYouTube) {
      setSubmitting(false);
      return setError(t('error.movie.video.required'));
    }

    if (movieVideo) {
      // Autoriser uniquement des fichiers vidéo MP4
      const mime = movieVideo.type || '';
      const name = (movieVideo.name || '').toLowerCase();
      const isMp4Mime = mime === 'video/mp4';
      const isMp4Ext = name.endsWith('.mp4');

      if (!isMp4Mime && !isMp4Ext) {
        setSubmitting(false);
        return setError(t('error.movie.video.invalidType'));
      }

      const MAX_BYTES = 300 * 1024 * 1024; // 300 MB
      if (movieVideo.size > MAX_BYTES) {
        setSubmitting(false);
        return setError(t('error.movie.video.tooLarge'));
      }
    }

    try {
      await movieOp.run(localMovie);
    } catch (err) {
      setError(err.message || String(err));
      trackEvent('submit_step_error', {
        funnel_name: 'film_submission',
        step_number: 2,
        error_message: err.message || String(err),
      });
      setSubmitting(false);
    }
  };

  const handleSubmitAIDeclaration = async (aiLocal) => {
    if (!movieId) return;
    setError(null);
    const payload = aiLocal || aiDeclaration;
    const validationError = validateAiDeclaration(payload);
    if (validationError) {
      setSubmitting(false);
      return setError(validationError);
    }

    try {
      await aiOp.run(payload);
    } catch (err) {
      setError(err.message || String(err));
      trackEvent('submit_step_error', {
        funnel_name: 'film_submission',
        step_number: 3,
        error_message: err.message || String(err),
      });
      setSubmitting(false);
    }
  };

  const handleSubmitCollaborators = async () => {
    if (!movieId) return;
    setError(null);
    const validationError = validateCollaborators(collaborators);
    if (validationError) {
      setSubmitting(false);
      return setError(validationError);
    }

    try {
      await collabOp.run();
    } catch (err) {
      setError(t('error.collaborators.saveFailed'));
      trackEvent('submit_step_error', {
        funnel_name: 'film_submission',
        step_number: 5,
        error_message: err.message || String(err),
      });
      setSubmitting(false);
    }
  };

  const handleSubmitAssetsTags = async () => {
    if (!movieId) return;
    setError(null);

    try {
      await assetsOp.run();
    } catch (err) {
      setError(err.message || String(err));
      trackEvent('submit_step_error', {
        funnel_name: 'film_submission',
        step_number: 4,
        error_message: err.message || String(err),
      });
      setSubmitting(false);
    }
  };

  return {
    handleSubmitFilmmaker,
    handleSubmitMovie,
    handleSubmitAIDeclaration,
    handleSubmitCollaborators,
    handleSubmitAssetsTags,
  };
}
