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
      if (!raw) return;
      const d = JSON.parse(raw);
      setForm((prev) => ({
        ...prev,
        filmmaker: d.filmmaker ?? prev.filmmaker,
        movie: d.movie ?? prev.movie,
        aiDeclaration: d.aiDeclaration ?? prev.aiDeclaration,
        collaborators: Array.isArray(d.collaborators)
          ? d.collaborators
          : prev.collaborators,
        tags: Array.isArray(d.tags) ? d.tags : prev.tags,
        assets: d.assets ?? prev.assets,
      }));

      if (typeof d.currentStep === "number") setCurrentStep(d.currentStep);
      if (d.filmmakerId) setFilmmakerId(d.filmmakerId);
      if (d.movieId) setMovieId(d.movieId);
      if (d.aiSaved) setAiSaved(!!d.aiSaved);
      if (d.collaboratorsSaved) setCollaboratorsSaved(!!d.collaboratorsSaved);
      if (d.assetsTagsSaved) setAssetsTagsSaved(!!d.assetsTagsSaved);
      setHasDraft(false);
    } catch (err) {
      /* ignore parse errors */
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
      const toSave = {
        filmmaker: form.filmmaker,
        movie: form.movie,
        aiDeclaration: form.aiDeclaration,
        collaborators: form.collaborators,
        tags: form.tags,
        assets: form.assets,
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
      /* ignore quota errors */
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
