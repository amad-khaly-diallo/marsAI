import api from "../services/api";

export default function useSubmission() {
  const createFilmmaker = async (payload) => {
    return await api.post("/filmmakers", payload);
  };

  const submitMovie = async (payload, videoFile) => {
    const formData = new FormData();
    formData.append("payload", JSON.stringify(payload));
    if (videoFile) formData.append("video", videoFile);
    return await api.postForm("/movies/submit", formData);
  };

  const saveAiDeclaration = async (movieId, data) => {
    return await api.put(`/movies/${movieId}/ai-declaration`, data);
  };

  const addCollaborator = async (movieId, collaborator) => {
    return await api.post(`/movies/${movieId}/collaborators`, collaborator);
  };

  const uploadAssets = async (movieId, stillFiles = [], subtitle = null) => {
    const formData = new FormData();
    stillFiles.forEach((f) => formData.append("stills", f));
    if (subtitle) formData.append("subtitle", subtitle);
    return await api.postForm(`/movies/${movieId}/assets`, formData);
  };

  const addTag = async (movieId, label) => {
    return await api.post(`/movies/${movieId}/tags`, { label });
  };

  return {
    createFilmmaker,
    submitMovie,
    saveAiDeclaration,
    addCollaborator,
    uploadAssets,
    addTag,
  };
}
