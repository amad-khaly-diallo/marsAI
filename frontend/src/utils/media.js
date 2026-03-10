export function resolveMediaUrl(url) {
  if (!url) return null;
  // Si c'est déjà une URL absolue (S3, autre CDN, http/https), on la laisse telle quelle
  if (/^https?:\/\//i.test(url)) return url;
  // Sinon, on considère que c'est un chemin servi par le backend (ex: "uploads/...", "/uploads/...")
  const normalized = url.replace(/^\/+/, '');
  return `${window.location.origin}/${normalized}`;
}

