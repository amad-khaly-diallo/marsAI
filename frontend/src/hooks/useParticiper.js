import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useParticiperState from "./useParticiperState";
import useParticiperValidation from "./useParticiperValidation";
import useParticiperSubmit from "./useParticiperSubmit";

export default function useParticiper() {
  const { t } = useTranslation();

  const state = useParticiperState();

  // keep destructured names for backwards compatibility
  const {
    filmmaker,
    setFilmmaker,
    movie,
    setMovie,
    aiDeclaration,
    setAiDeclaration,
    collaborators,
    setCollaborators,
    assets,
    setAssets,
    tags,
    setTags,
    movieVideo,
    setMovieVideo,
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
    hasDraft,
    loadDraft,
    clearDraft,
  } = state;

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const {
    validateFilmmaker,
    validateMovie,
    validateAiDeclaration,
    validateCollaborators,
  } = useParticiperValidation();

  // clear step error when user navigates between steps
  useEffect(() => {
    setError(null);
  }, [currentStep]);

  // delegate submission handlers to the focused submit hook
  const submit = useParticiperSubmit({
    filmmaker: state.filmmaker,
    movie: state.movie,
    movieVideo: state.movieVideo,
    collaborators: state.collaborators,
    assets: state.assets,
    tags: state.tags,
    filmmakerId: state.filmmakerId,
    movieId: state.movieId,
    setFilmmakerId: state.setFilmmakerId,
    setMovieId: state.setMovieId,
    setAiSaved: state.setAiSaved,
    setCollaboratorsSaved: state.setCollaboratorsSaved,
    setAssetsTagsSaved: state.setAssetsTagsSaved,
    setSubmitting: state.setSubmitting,
    setError: state.setError,
    setCurrentStep: state.setCurrentStep,
    aiDeclaration: state.aiDeclaration,
    validateFilmmaker,
    validateMovie,
    validateAiDeclaration,
    validateCollaborators,
    t,
  });

  // clear stored draft when submission is fully finished
  useEffect(() => {
    if (finished) state.clearDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished]);

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
    handleSubmitFilmmaker: submit.handleSubmitFilmmaker,
    handleSubmitMovie: submit.handleSubmitMovie,
    handleSubmitAIDeclaration: submit.handleSubmitAIDeclaration,
    handleSubmitCollaborators: submit.handleSubmitCollaborators,
    handleSubmitAssetsTags: submit.handleSubmitAssetsTags,
    // draft helpers
    hasDraft,
    loadDraft,
    clearDraft,
  };
}
