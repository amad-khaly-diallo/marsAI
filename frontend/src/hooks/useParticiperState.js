import { useState, useEffect } from "react";

export default function useParticiperState() {
  const [form, setForm] = useState({
    filmmaker: {},
    movie: {},
    aiDeclaration: {},
    collaborators: [],
    assets: { stills: [], subtitle: null },
    tags: [],
  });

  // convenience setters that use functional updates on `form`
  const setFilmmaker = (next) =>
    setForm((prev) => ({
      ...prev,
      filmmaker: typeof next === "function" ? next(prev.filmmaker) : next,
    }));
  const setMovie = (next) =>
    setForm((prev) => ({
      ...prev,
      movie: typeof next === "function" ? next(prev.movie) : next,
    }));
  const setAiDeclaration = (next) =>
    setForm((prev) => ({
      ...prev,
      aiDeclaration:
        typeof next === "function" ? next(prev.aiDeclaration) : next,
    }));
  const setCollaborators = (next) =>
    setForm((prev) => ({
      ...prev,
      collaborators:
        typeof next === "function" ? next(prev.collaborators) : next,
    }));
  const setAssets = (next) =>
    setForm((prev) => ({
      ...prev,
      assets: typeof next === "function" ? next(prev.assets) : next,
    }));
  const setTags = (next) =>
    setForm((prev) => ({
      ...prev,
      tags: typeof next === "function" ? next(prev.tags) : next,
    }));

  // expose individual values for consumers
  const { filmmaker, movie, aiDeclaration, collaborators, assets, tags } = form;

  const [movieVideo, setMovieVideo] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [filmmakerId, setFilmmakerId] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [aiSaved, setAiSaved] = useState(false);
  const [collaboratorsSaved, setCollaboratorsSaved] = useState(false);
  const [assetsTagsSaved, setAssetsTagsSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // draft persistence
  const DRAFT_KEY = "participer:draft_v1";
  const [hasDraft, setHasDraft] = useState(false);

  // clear step error when user navigates between steps
  useEffect(() => {
    setError(null);
  }, [currentStep]);

  // load draft flag from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) setHasDraft(true);
    } catch (err) {
      /* ignore */
    }
  }, []);

  const loadDraft = () => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return false;

      const d = JSON.parse(raw);

      // support legacy shapes where the payload might be nested under `form` or `data`
      const source =
        d?.form && typeof d.form === "object"
          ? d.form
          : d?.data && typeof d.data === "object"
            ? d.data
            : d;

      setForm((prev) => ({
        ...prev,
        // merge instead of replace so partial drafts don't wipe other fields
        filmmaker: source.filmmaker
          ? { ...prev.filmmaker, ...source.filmmaker }
          : prev.filmmaker,
        movie: source.movie ? { ...prev.movie, ...source.movie } : prev.movie,
        aiDeclaration: source.aiDeclaration
          ? { ...prev.aiDeclaration, ...source.aiDeclaration }
          : prev.aiDeclaration,
        collaborators: Array.isArray(source.collaborators)
          ? source.collaborators
          : prev.collaborators,
        tags: Array.isArray(source.tags) ? source.tags : prev.tags,
        assets: source.assets
          ? { ...prev.assets, ...source.assets }
          : prev.assets,
      }));

      if (typeof source.currentStep === "number")
        setCurrentStep(source.currentStep);
      if (source.filmmakerId) setFilmmakerId(source.filmmakerId);
      if (source.movieId) setMovieId(source.movieId);
      if (source.aiSaved) setAiSaved(!!source.aiSaved);
      if (source.collaboratorsSaved)
        setCollaboratorsSaved(!!source.collaboratorsSaved);
      if (source.assetsTagsSaved) setAssetsTagsSaved(!!source.assetsTagsSaved);

      // clear transient UI states after restoring a draft
      setError(null);
      setSubmitting(false);

      setHasDraft(false);
      return true;
    } catch (err) {
      // if parse fails, keep the draft flag so user can try clearing it
      // eslint-disable-next-line no-console
      console.warn("Failed to load draft (parse error)", err);
      return false;
    }
  };

  const clearDraft = () => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (err) {
      /* ignore */
    }
    setHasDraft(false);
  };

  // persist draft to localStorage (omit File objects)
  useEffect(() => {
    try {
      // avoid serializing actual File objects — keep only lightweight metadata for stlls/subtitle
      const stillsMeta = Array.isArray(form.assets?.stills)
        ? form.assets.stills
            .filter(Boolean)
            .map((f) => ({ name: f.name, size: f.size, type: f.type }))
        : [];
      const subtitleMeta = form.assets?.subtitle
        ? { name: form.assets.subtitle.name }
        : null;

      const assetsForSave = {
        ...form.assets,
        stills: stillsMeta,
        subtitle: subtitleMeta,
      };

      const toSave = {
        filmmaker: form.filmmaker,
        movie: form.movie,
        aiDeclaration: form.aiDeclaration,
        collaborators: form.collaborators,
        tags: form.tags,
        assets: assetsForSave,
        currentStep,
        filmmakerId,
        movieId,
        aiSaved,
        collaboratorsSaved,
        assetsTagsSaved,
        savedAt: Date.now(),
      };

      localStorage.setItem(DRAFT_KEY, JSON.stringify(toSave));
    } catch (err) {
      /* ignore quota/serialization errors */
    }
  }, [
    form,
    currentStep,
    filmmakerId,
    movieId,
    aiSaved,
    collaboratorsSaved,
    assetsTagsSaved,
  ]);

  const finished =
    filmmakerId && movieId && aiSaved && assetsTagsSaved && collaboratorsSaved;

  // clear stored draft when submission is fully finished
  useEffect(() => {
    if (finished) clearDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

  return {
    form,
    // pieces
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
    // control state
    currentStep,
    setCurrentStep,
    filmmakerId,
    setFilmmakerId,
    movieId,
    setMovieId,
    aiSaved,
    setAiSaved,
    collaboratorsSaved,
    setCollaboratorsSaved,
    assetsTagsSaved,
    setAssetsTagsSaved,
    submitting,
    setSubmitting,
    error,
    setError,
    finished,
    // draft helpers
    hasDraft,
    loadDraft,
    clearDraft,
  };
}
