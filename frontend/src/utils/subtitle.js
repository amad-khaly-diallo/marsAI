// Convertit un contenu SRT en WebVTT (format requis par <track>)
export function srtToVtt(srt) {
  const blocks = srt
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split('\n');
      const i = /^\d+$/.test(lines[0]?.trim()) ? 1 : 0;
      if (!lines[i]) return '';
      const time = lines[i].replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, '$1.$2');
      return time + '\n' + lines.slice(i + 1).join('\n');
    })
    .filter(Boolean)
    .join('\n\n');
  return 'WEBVTT\n\n' + blocks + '\n\n';
}

// Détecte la langue depuis le nom du fichier (ex: subtitle_fr.srt → 'fr')
export function detectSubtitleLang(filePath) {
  const name = (filePath || '').toLowerCase();
  if (/_en[._-]|[-._]en\./i.test(name)) return 'en';
  if (/_fr[._-]|[-._]fr\./i.test(name)) return 'fr';
  if (/_ar[._-]|[-._]ar\./i.test(name)) return 'ar';
  return null;
}
