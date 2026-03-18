export function buildSocialShareLinks({ url, text }) {
  const u = encodeURIComponent(url || '');
  const t = encodeURIComponent(text || '');

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    x: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      [text, url].filter(Boolean).join(' - '),
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
  };
}

export async function tryNativeShare({ title, text, url }) {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function')
    return false;

  try {
    await navigator.share({
      title: title || '',
      text: text || '',
      url: url || '',
    });
    return true;
  } catch {
    return false;
  }
}

export async function tryNativeShareFile({
  fileUrl,
  filename,
  title,
  text,
  mimeType = 'video/mp4',
}) {
  if (
    typeof navigator === 'undefined' ||
    typeof navigator.share !== 'function' ||
    typeof window === 'undefined'
  ) {
    return false;
  }

  // Some browsers support navigator.canShare for file checks.
  const canShare = typeof navigator.canShare === 'function';

  try {
    const res = await fetch(fileUrl, { credentials: 'include' });
    if (!res.ok) return false;

    const blob = await res.blob();
    const inferredType = blob.type || mimeType;
    const file = new File([blob], filename || 'video.mp4', {
      type: inferredType,
    });

    if (canShare && !navigator.canShare({ files: [file] })) return false;

    await navigator.share({
      title: title || '',
      text: text || '',
      files: [file],
    });
    return true;
  } catch {
    return false;
  }
}

export function safeFilename(input) {
  const base = String(input || 'video')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

  return base || 'video';
}

