import { useMemo, useState, useEffect } from 'react';
import {
  X,
  Clock,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
} from 'lucide-react';
import { resolveMediaUrl } from '../../../utils/media';
import { useAdmin } from '../../../contexts';
import {
  buildSocialShareLinks,
  safeFilename,
  tryNativeShare,
  tryNativeShareFile,
} from '../../../utils/socialShare';

function getYouTubeEmbed(url) {
  if (!url) return null;
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return null;
}

export default function MyMovieModal({
  movie,
  isOpen,
  onClose,
  onNext,
  onPrev,
  onSaveReview,
  savingReview,
  onUpdateFlag,
  savingFlag,
}) {
  const { role } = useAdmin();
  const canShareOrDownload = role === 'admin' || role === 'super_admin';
  const [sharing, setSharing] = useState(false);
  const [localRating, setLocalRating] = useState(movie?.my_rating ?? '');
  const [localComment, setLocalComment] = useState(movie?.my_comment ?? '');

  const embedUrl = useMemo(() => getYouTubeEmbed(movie?.youtube_url), [movie]);
  const hasLocalVideo = !!movie?.video_url;
  const localSrc = hasLocalVideo ? resolveMediaUrl(movie.video_url) : null;

  useEffect(() => {
    if (!movie) return;
    setLocalRating(movie.my_rating ?? '');
    setLocalComment(movie.my_comment ?? '');
  }, [movie]);

  if (!isOpen || !movie) return null;

  const shareUrl =
    hasLocalVideo && localSrc ? localSrc : movie.youtube_url || null;
  const shareText = movie.original_title
    ? `Regarder : ${movie.original_title}`
    : 'Regarder cette vidéo';
  const shareLinks = shareUrl
    ? buildSocialShareLinks({ url: shareUrl, text: shareText })
    : null;

  const handleShare = async () => {
    if (!shareUrl) return;
    if (sharing) return;
    setSharing(true);
    try {
      // Si vidéo locale: on essaie de partager LE FICHIER (mp4) vers l'app (WhatsApp, Messages, etc.)
      if (hasLocalVideo && localSrc) {
        const didFileShare = await tryNativeShareFile({
          fileUrl: localSrc,
          filename: `${safeFilename(movie.original_title)}-${movie.id}.mp4`,
          title: movie.original_title || 'Vidéo',
          text: shareText,
        });
        if (didFileShare) return;
      }

      // Sinon fallback: partage natif du lien (ou lien WhatsApp)
      const didNative = await tryNativeShare({
        title: movie.original_title || 'Vidéo',
        text: shareText,
        url: shareUrl,
      });
      if (didNative) return;
      if (shareLinks?.whatsapp)
        window.open(shareLinks.whatsapp, '_blank', 'noopener,noreferrer');
    } finally {
      setSharing(false);
    }
  };

  const handleSaveReview = () => {
    onSaveReview(movie.id, {
      rating:
        localRating !== '' && localRating !== null ? Number(localRating) : null,
      comment: localComment || null,
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-3">
      <div className="relative flex w-full max-w-5xl flex-col gap-4 rounded-2xl bg-slate-950/95 p-4 shadow-2xl border border-slate-800">
        {/* Header + close */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">
              {movie.original_title || 'Sans titre'}
            </h3>
            <p className="text-xs text-brand-muted">
              {movie.filmmaker
                ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                : '—'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {canShareOrDownload && shareUrl && (
              <div className="flex items-center gap-2">
                {hasLocalVideo && localSrc && (
                  <a
                    href={localSrc}
                    download={`${safeFilename(movie.original_title)}-${movie.id}.mp4`}
                    className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-800/80"
                    title="Télécharger la vidéo"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Télécharger
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleShare}
                  disabled={sharing}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-700 bg-slate-900/70 px-2.5 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-800/80"
                  title="Partager la vidéo"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  {sharing ? 'Préparation...' : 'Partager'}
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-slate-900/80 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video + status */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-3/5">
            <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video border border-slate-800">
              {hasLocalVideo && localSrc ? (
                <video
                  src={localSrc}
                  className="h-full w-full object-cover"
                  controls
                />
              ) : embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="h-full w-full"
                  allowFullScreen
                  title={movie.original_title}
                  frameBorder="0"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  Pas de vidéo disponible
                </div>
              )}
            </div>
            {canShareOrDownload && shareLinks && (
              <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-200 hover:bg-slate-800/80"
                >
                  Facebook
                </a>
                <a
                  href={shareLinks.x}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-200 hover:bg-slate-800/80"
                >
                  X
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-200 hover:bg-slate-800/80"
                >
                  WhatsApp
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 text-slate-200 hover:bg-slate-800/80"
                >
                  LinkedIn
                </a>
              </div>
            )}
          </div>

          <div className="flex flex-1 flex-col gap-3">
            {/* Métadonnées */}
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {movie.duration ? `${movie.duration} sec` : 'Durée inconnue'}
              </span>
            </div>

            {/* Synopsis */}
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                Synopsis
              </p>
              <p className="text-xs text-slate-200 line-clamp-5">
                {movie.synopsis_original || 'Pas de synopsis disponible.'}
              </p>
            </div>

            {/* Note + commentaire + flags personnels */}
            <div className="mt-2 space-y-2 border-t border-slate-800 pt-3">
              <p className="text-[11px] text-brand-muted">
                Votre note et commentaire{' '}
                <span className="font-semibold text-slate-100">(privés)</span>.
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={localRating}
                  onChange={(e) => setLocalRating(e.target.value)}
                  className="w-20 rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1 text-xs text-slate-100 outline-none"
                  placeholder="Note"
                />
                <span className="text-[11px] text-brand-muted">/10</span>
              </div>
              <textarea
                rows={3}
                value={localComment}
                onChange={(e) => setLocalComment(e.target.value)}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none"
                placeholder="Votre commentaire (optionnel, visible uniquement par vous)..."
              />
              {typeof onUpdateFlag === 'function' && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['green', 'yellow', 'red'].map((flag) => {
                    const isActive = movie.my_flag === flag;
                    const baseColor =
                      flag === 'green'
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/40'
                        : flag === 'yellow'
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/40'
                          : 'bg-red-500/10 text-red-300 border-red-500/40';

                    return (
                      <button
                        key={flag}
                        type="button"
                        onClick={() =>
                          savingReview // on évite de spammer pendant un save de review
                            ? null
                            : onUpdateFlag(
                                movie.id,
                                movie.my_flag === flag ? null : flag,
                              )
                        }
                        disabled={savingReview === movie.id}
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold transition-colors ${
                          isActive
                            ? `${baseColor}`
                            : 'bg-slate-900/60 text-slate-300 border-slate-700 hover:bg-slate-800/80'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {flag === 'green'
                          ? 'Green'
                          : flag === 'yellow'
                            ? 'Yellow'
                            : 'Red'}
                      </button>
                    );
                  })}
                </div>
              )}
              <button
                type="button"
                onClick={handleSaveReview}
                disabled={savingReview === movie.id}
                className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {savingReview === movie.id
                  ? 'Enregistrement...'
                  : 'Enregistrer mon avis'}
              </button>
            </div>
          </div>
        </div>

        {/* Navigation entre vidéos */}
        <div className="mt-1 flex items-center justify-between text-xs text-brand-muted">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            <ChevronLeft className="w-4 h-4" />
            Précédente
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            Suivante
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
