import api from '../services/api';

/**
 * Valide la vidéo côté client (ratio 16:9 + durée max 60s).
 * @returns {Promise<number>} durée en secondes (arrondie)
 */
function validateVideoClientSide(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url);
      const w = video.videoWidth;
      const h = video.videoHeight;
      const duration = video.duration;

      if (duration > 60) {
        return reject(new Error('La vidéo dépasse la durée maximale de 1 minute.'));
      }

      const TARGET_RATIO = 16 / 9;
      const ratio = w / h;
      const relativeDiff = Math.abs(ratio - TARGET_RATIO) / TARGET_RATIO;

      if (!(w > h && relativeDiff <= 0.1)) {
        return reject(
          new Error(
            `Vidéo non conforme (${w}x${h}, ratio ≈ ${ratio.toFixed(2)}), il faut du 16:9 en mode paysage (tolérance 10%).`,
          ),
        );
      }

      resolve(Math.round(duration));
    };

    video.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Impossible de lire le fichier vidéo.'));
    };

    video.src = url;
  });
}

/**
 * Upload direct vers S3 via presigned URL avec suivi de progression.
 */
function uploadToS3WithProgress(presignedUrl, file, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', presignedUrl, true);
    xhr.setRequestHeader('Content-Type', file.type);

    if (xhr.upload && typeof onProgress === 'function') {
      xhr.upload.onprogress = (e) => {
        if (!e.lengthComputable) return;
        const pct = Math.round((e.loaded / e.total) * 100);
        try {
          onProgress(pct);
        } catch (_) {}
      };
    }

    xhr.onerror = () => reject(new Error("Erreur réseau lors de l'upload vers S3."));
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Échec de l'upload vers S3 (${xhr.status}).`));
      }
    };

    xhr.send(file);
  });
}

export default function useSubmission() {
  const createFilmmaker = async (payload) => {
    return await api.post('/filmmakers', payload);
  };

  const submitMovieWithProgress = async (payload, videoFile, onProgress) => {
    if (videoFile) {
      // 1. Validation côté client (ratio 16:9 + durée)
      const duration = await validateVideoClientSide(videoFile);

      // 2. Obtenir la presigned URL depuis le backend
      if (typeof onProgress === 'function') onProgress(0);
      const { presignedUrl, publicUrl } = await api.post('/upload/presigned-video', {
        filename: videoFile.name,
        mimetype: videoFile.type,
      });

      // 3. Upload direct vers S3 (progress 0→90%)
      await uploadToS3WithProgress(presignedUrl, videoFile, (pct) => {
        if (typeof onProgress === 'function') onProgress(Math.round(pct * 0.9));
      });

      if (typeof onProgress === 'function') onProgress(90);

      // 4. Enregistrer le film en base avec l'URL S3
      const result = await api.post('/movies/submit', {
        ...payload,
        video_url: publicUrl,
        duration,
      });

      if (typeof onProgress === 'function') onProgress(100);
      return result;
    }

    // Chemin lien YouTube
    return await api.post('/movies/submit', payload);
  };

  const submitMovie = async (payload, videoFile) => {
    return submitMovieWithProgress(payload, videoFile, null);
  };

  const saveAiDeclaration = async (movieId, data) => {
    return await api.put(`/movies/${movieId}/ai-declaration`, data);
  };

  const addCollaborator = async (movieId, collaborator) => {
    return await api.post(`/movies/${movieId}/collaborators`, collaborator);
  };

  const uploadAssets = async (movieId, stillFiles = [], subtitle = null) => {
    const formData = new FormData();
    stillFiles.forEach((f) => formData.append('stills', f));
    if (subtitle) formData.append('subtitle', subtitle);
    return await api.postForm(`/movies/${movieId}/assets`, formData);
  };

  const uploadAssetsWithProgress = async (
    movieId,
    stillFiles = [],
    subtitle = null,
    onProgress,
    thumbnail = null,
  ) => {
    const formData = new FormData();
    if (thumbnail) formData.append('thumbnail', thumbnail);
    stillFiles.forEach((f) => formData.append('stills', f));
    if (subtitle) formData.append('subtitle', subtitle);
    return await api.postFormWithProgress(
      `/movies/${movieId}/assets`,
      formData,
      onProgress,
    );
  };

  const addTag = async (movieId, label) => {
    return await api.post(`/movies/${movieId}/tags`, { label });
  };

  return {
    createFilmmaker,
    submitMovie,
    submitMovieWithProgress,
    saveAiDeclaration,
    addCollaborator,
    uploadAssets,
    uploadAssetsWithProgress,
    addTag,
  };
}
