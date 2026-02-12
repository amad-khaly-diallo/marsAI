import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useSubmission from "./useSubmission";

export default function useParticiper() {
  const { t } = useTranslation();
  const submission = useSubmission();

  const [filmmaker, setFilmmaker] = useState({});
  const [movie, setMovie] = useState({});
  const [movieVideo, setMovieVideo] = useState(null);
  const [aiDeclaration, setAiDeclaration] = useState({});
  const [collaborators, setCollaborators] = useState([]);
  const [assets, setAssets] = useState({ stills: [], subtitle: null });
  const [tags, setTags] = useState([]);

  const [currentStep, setCurrentStep] = useState(1);
  const [filmmakerId, setFilmmakerId] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [aiSaved, setAiSaved] = useState(false);
  const [collaboratorsSaved, setCollaboratorsSaved] = useState(false);
  const [assetsTagsSaved, setAssetsTagsSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  /* --- validation helpers (returns translated message or null) --- */
  const validateFilmmaker = (f) => {
    if (
      !f.first_name ||
      !f.first_name.trim() ||
      !f.last_name ||
      !f.last_name.trim()
    ) {
      return t("error.filmmaker.namePair.required");
    }
    if (!f.birth_date) return t("error.filmmaker.birthDate.required");
    if (!f.email || !emailRegex.test(f.email))
      return t("error.filmmaker.email.invalid");
    if (
      f.mobile &&
      f.mobile.trim().length > 0 &&
      !/^[0-9+().\s-]{6,20}$/.test(f.mobile)
    ) {
      return t("error.filmmaker.mobile.invalid");
    }
    if (f.city && f.city.length > 80) return t("error.filmmaker.city.tooLong");
    if (f.country && f.country.length > 80)
      return t("error.filmmaker.country.tooLong");
    return null;
  };

  const validateMovie = (m) => {
    if (!m.original_title || !m.original_title.trim())
      return t("error.movie.originalTitle.required");
    if (!m.english_title || !m.english_title.trim())
      return t("error.movie.englishTitle.required");
    const durationNumber = Number(m.duration);
    if (
      !Number.isFinite(durationNumber) ||
      durationNumber <= 0 ||
      durationNumber > 1.5
    )
      return t("error.movie.duration.range");
    if (m.youtube_url && m.youtube_url.length > 0) {
      try {
        // basic URL check
        // eslint-disable-next-line no-new
        new URL(m.youtube_url);
      } catch {
        return t("error.movie.youtube.invalid");
      }
    }
    return null;
  };

  const validateAiDeclaration = (d) => {
    if (!d.artwork_type) return t("error.ai.artworkType.required");
    if (!d.methodology || d.methodology.trim().length < 30)
      return t("error.ai.methodology.min");
    return null;
  };

  const validateCollaborators = (list) => {
    if (!Array.isArray(list)) return null;
    for (const collab of list) {
      const hasAnyField =
        (collab.first_name && collab.first_name.trim()) ||
        (collab.last_name && collab.last_name.trim()) ||
        (collab.role && collab.role.trim()) ||
        (collab.email && collab.email.trim());
      if (!hasAnyField) continue;
      if (
        !collab.first_name ||
        !collab.first_name.trim() ||
        !collab.last_name ||
        !collab.last_name.trim()
      ) {
        return t("error.collaborators.name.required");
      }
      if (!collab.role || !collab.role.trim())
        return t("error.collaborators.role.required");
      if (
        collab.email &&
        collab.email.trim().length > 0 &&
        !emailRegex.test(collab.email)
      ) {
        return t("error.collaborators.email.invalid");
      }
    }
    return null;
  };

  /* --- submission handlers (useSubmission handles network) --- */
  const handleSubmitFilmmaker = async () => {
    setError(null);
    const validationError = validateFilmmaker(filmmaker);
    if (validationError) return setError(validationError);

    setSubmitting(true);
    try {
      const data = await submission.createFilmmaker(filmmaker);
      setFilmmakerId(data.id);
      setCurrentStep(2);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitMovie = async () => {
    if (!filmmakerId) return;
    setError(null);
    const validationError = validateMovie(movie);
    if (validationError) return setError(validationError);

    setSubmitting(true);
    try {
      const payload = { ...movie, filmmaker_id: filmmakerId };
      const data = await submission.submitMovie(payload, movieVideo);
      setMovieId(data.movie_id);
      setCurrentStep(3);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitAIDeclaration = async () => {
    if (!movieId) return;
    setError(null);
    const validationError = validateAiDeclaration(aiDeclaration);
    if (validationError) return setError(validationError);

    setSubmitting(true);
    try {
      await submission.saveAiDeclaration(movieId, aiDeclaration);
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

  const finished =
    filmmakerId && movieId && aiSaved && assetsTagsSaved && collaboratorsSaved;

  return {
    // state
    filmmaker,
    setFilmmaker,
    movie,
    setMovie,
    movieVideo,
    setMovieVideo,
    aiDeclaration,
    setAiDeclaration,
    collaborators,
    setCollaborators,
    assets,
    setAssets,
    tags,
    setTags,
    currentStep,
    setCurrentStep,
    filmmakerId,
    movieId,
    aiSaved,
    collaboratorsSaved,
    assetsTagsSaved,
    submitting,
    error,
    finished,
    // actions
    handleSubmitFilmmaker,
    handleSubmitMovie,
    handleSubmitAIDeclaration,
    handleSubmitCollaborators,
    handleSubmitAssetsTags,
  };
}
