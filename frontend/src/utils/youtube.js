export function getYouTubeEmbed(url) {
  if (!url) return null;
  const regExp =
    /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[1].length === 11) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
}
