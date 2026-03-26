export function resolveMediaUrl(url) {
  if (!url) return null;
  // Commence par https → on laisse tel quel
  if (url.startsWith('https')) {
    console.log('[resolveMediaUrl] S3/externe :', url);
    return url;
  }
  // Commence par /uploads ou uploads → on préfixe avec l'URL du backend
  const apiBase = (process.env.REACT_APP_API_URL || 'http://localhost:5000')
    .trim()
    .replace(/\/$/, '');
  const normalized = url.replace(/^\/+/, '');
  const resolved = `${apiBase}/${normalized}`;
  console.log('[resolveMediaUrl] local :', url, '→', resolved);
  return resolved;
}
