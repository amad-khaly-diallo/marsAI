import useSubmission from "./useSubmission";

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
  // include aiDeclaration (used as fallback in submit handler)
  aiDeclaration,
  // validators
  validateFilmmaker,
  validateMovie,
  validateAiDeclaration,
  validateCollaborators,
  // translation helper
  t,
}) {
  const submission = useSubmission();

  const handleSubmitFilmmaker = async (filmmakerLocal) => {
    setError(null);
    const validationError = validateFilmmaker(filmmakerLocal || filmmaker);
    if (validationError) return setError(validationError);

    setSubmitting(true);
    try {
      const data = await submission.createFilmmaker(
        filmmakerLocal || filmmaker,
      );
      setFilmmakerId(data.id);
      setCurrentStep(2);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitMovie = async (movieLocal) => {
    if (!filmmakerId) return;
    setError(null);
    const validationError = validateMovie(movieLocal || movie);
    if (validationError) return setError(validationError);

    const localMovie = movieLocal || movie;

    const hasYouTube =
      localMovie.youtube_url && localMovie.youtube_url.trim().length > 0;
    if (!movieVideo && !hasYouTube) {
      return setError(t("error.movie.video.required"));
    }

    if (movieVideo) {
      if (!movieVideo.type || !movieVideo.type.startsWith("video/")) {
        return setError(t("error.movie.video.invalidType"));
      }
      const MAX_BYTES = 50 * 1024 * 1024; // 50 MB
      if (movieVideo.size > MAX_BYTES) {
        return setError(t("error.movie.video.tooLarge"));
      }
    }

    setSubmitting(true);
    try {
      const payload = { ...localMovie, filmmaker_id: filmmakerId };
      const data = await submission.submitMovie(payload, movieVideo);
      setMovieId(data.movie_id);
      setCurrentStep(3);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAIDeclaration = async (aiLocal) => {
    if (!movieId) return;
    setError(null);
    const payload = aiLocal || aiDeclaration;
    const validationError = validateAiDeclaration(payload);
    if (validationError) return setError(validationError);

    setSubmitting(true);
    try {
      await submission.saveAiDeclaration(movieId, payload);
      setAiSaved(true);
      setCurrentStep(4);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitCollaborators = async () => {
    if (!movieId) return;
    setError(null);
    const validationError = validateCollaborators(collaborators);
    if (validationError) return setError(validationError);

    setSubmitting(true);
    try {
      if (!collaborators.length) {
        setCollaboratorsSaved(true);
        return;
      }
      await Promise.all(
        collaborators.map((c) => submission.addCollaborator(movieId, c)),
      );
      setCollaboratorsSaved(true);
    } catch (err) {
      setError(t("error.collaborators.saveFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAssetsTags = async () => {
    if (!movieId) return;
    setError(null);
    setSubmitting(true);

    try {
      const stillFiles = Array.isArray(assets.stills) ? assets.stills : [];
      if (stillFiles.length > 0 || assets.subtitle) {
        stillFiles.forEach((file) => {
          if (!file.type.startsWith("image/"))
            throw new Error(t("error.assets.still.invalidType"));
        });
        if (assets.subtitle) {
          const name = assets.subtitle.name || "";
          if (!name.toLowerCase().endsWith(".srt"))
            throw new Error(t("error.assets.subtitle.invalidType"));
        }
      }

      const requests = [];
      if (stillFiles.length > 0 || assets.subtitle)
        requests.push(
          submission.uploadAssets(movieId, stillFiles, assets.subtitle),
        );
      const cleanTags = (tags || [])
        .map((x) => x.trim())
        .filter((x) => x.length > 0);
      cleanTags.forEach((label) =>
        requests.push(submission.addTag(movieId, label)),
      );

      if (requests.length > 0) await Promise.all(requests);

      setAssetsTagsSaved(true);
      setCurrentStep(5);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
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
