const API_BASE = process.env.REACT_APP_API_URL || '';

/**
 * Upload une vidéo vers S3 via l'API backend.
 * @param {File} file
 * @returns {Promise<{ url: string, key: string, filename: string }>}
 */
export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/api/upload/video`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Erreur upload vidéo');
  }
  return response.json();
};

/**
 * Upload une image vers S3 via l'API backend.
 * @param {File} file
 * @returns {Promise<{ url: string, key: string, filename: string }>}
 */
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/api/upload/image`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Erreur upload image');
  }
  return response.json();
};

/**
 * Upload une miniature vers S3 via l'API backend.
 * @param {File} file
 * @returns {Promise<{ url: string, key: string, filename: string }>}
 */
export const uploadThumbnail = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/api/upload/thumbnail`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Erreur upload thumbnail');
  }
  return response.json();
};

/**
 * Supprime un fichier S3 via sa clé.
 * @param {string} key  clé du fichier (ex: "grp2/videos/xxx.mp4")
 * @returns {Promise<{ success: boolean }>}
 */
export const deleteUpload = async (key) => {
  const response = await fetch(
    `${API_BASE}/api/upload/${encodeURIComponent(key)}`,
    { method: 'DELETE' },
  );
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Erreur suppression fichier');
  }
  return response.json();
};
