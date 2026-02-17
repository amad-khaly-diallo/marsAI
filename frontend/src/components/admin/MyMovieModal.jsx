import { useMemo, useState } from "react";
import { STATUS_LABELS } from "../../constants/status";

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
  onChangeStatus,
  onSaveReview,
  savingStatus,
  savingReview,
}) {
  const [localRating, setLocalRating] = useState(movie?.my_rating ?? "");
  const [localComment, setLocalComment] = useState(movie?.my_comment ?? "");

  const embedUrl = useMemo(() => getYouTubeEmbed(movie?.youtube_url), [movie]);

  const locked = movie?.status === "selected" || movie?.status === "rejected";

  if (!isOpen || !movie) return null;

  const handleSaveReview = () => {
    onSaveReview(movie.id, {
      rating:
        localRating !== "" && localRating !== null ? Number(localRating) : null,
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
              {movie.original_title || "Sans titre"}
            </h3>
            <p className="text-xs text-brand-muted">
              {movie.filmmaker
                ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                : "—"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900/80 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100"
          >
            ✕
          </button>
        </div>

        {/* Video + status */}
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="md:w-3/5">
            <div className="relative w-full overflow-hidden rounded-xl bg-black aspect-video border border-slate-800">
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  className="h-full w-full"
                  allowFullScreen
                  title={movie.original_title}
                  frameBorder="0"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-gray-500">
                  Pas de lien vidéo
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3">
            {/* Statut + durée */}
            <div className="flex items-center justify-between gap-3">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase border ${
                  movie.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : movie.status === "selected"
                      ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                      : movie.status === "rejected"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : movie.status === "in_process"
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                          : "bg-slate-900/80 text-brand-muted border-slate-700"
                }`}
              >
                {STATUS_LABELS[movie.status] || movie.status}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-brand-muted">
                ⏱ {movie.duration ? `${movie.duration} min` : "Durée inconnue"}
              </span>
            </div>

            {/* Synopsis */}
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                Synopsis
              </p>
              <p className="text-xs text-slate-200 line-clamp-5">
                {movie.synopsis_original || "Pas de synopsis disponible."}
              </p>
            </div>

            {/* Actions décision */}
            <div className="mt-1 flex flex-wrap items-center gap-2 border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => onChangeStatus(movie.id, "rejected")}
                disabled={savingStatus === movie.id || locked}
                className="inline-flex items-center rounded-full bg-red-500/15 px-3 py-1.5 text-[11px] font-semibold text-red-300 hover:bg-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Rejeter
              </button>
              <button
                type="button"
                onClick={() => onChangeStatus(movie.id, "selected")}
                disabled={savingStatus === movie.id || locked}
                className="inline-flex items-center rounded-full bg-brand-primary/15 px-3 py-1.5 text-[11px] font-semibold text-brand-primary hover:bg-brand-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ★ Sélectionner
              </button>
            </div>

            {/* Note + commentaire (uniquement si sélectionné) */}
            {movie.status === "selected" && (
              <div className="mt-2 space-y-2 border-t border-slate-800 pt-3">
                <p className="text-[11px] text-brand-muted">
                  Votre note et commentaire{" "}
                  <span className="font-semibold text-slate-100">(privés)</span>
                  .
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
                <button
                  type="button"
                  onClick={handleSaveReview}
                  disabled={savingReview === movie.id}
                  className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingReview === movie.id
                    ? "Enregistrement..."
                    : "Enregistrer mon avis"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation entre vidéos */}
        <div className="mt-1 flex items-center justify-between text-xs text-brand-muted">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            ← Précédente
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            Suivante →
          </button>
        </div>
      </div>
    </div>
  );
}
