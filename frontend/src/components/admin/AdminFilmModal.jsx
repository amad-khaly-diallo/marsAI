import { useMemo } from "react";
import {
  X,
  Clock,
  Star,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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

export default function AdminFilmModal({
  movie,
  isOpen,
  onClose,
  onNext,
  onPrev,
  reviews,
  loadingReviews,
  reviewsError,
  onToggleWinner,
  togglingWinnerId,
  winnersCount,
  winnerError,
}) {
  const embedUrl = useMemo(() => getYouTubeEmbed(movie?.youtube_url), [movie]);

  if (!isOpen || !movie) return null;

  const isToggling = togglingWinnerId === movie.id;
  const canMarkWinner =
    movie.status === "selected" &&
    (movie.is_winner || winnersCount < 6) &&
    !isToggling;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 px-3 md:px-6">
      <div className="relative flex w-full max-w-6xl flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
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
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Video */}
          <div className="md:w-3/5">
            <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-slate-800 bg-black">
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

          {/* Right panel */}
          <div className="flex flex-1 flex-col gap-3">
            {/* Status + meta */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase ${
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
                <span>{STATUS_LABELS[movie.status] || movie.status}</span>
                {movie.is_winner && (
                  <span className="inline-flex items-center gap-1 text-amber-300">
                    <Trophy className="h-3.5 w-3.5" />
                    Gagnant
                  </span>
                )}
              </span>
              <div className="flex flex-col items-end gap-1 text-xs text-brand-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {movie.duration ? `${movie.duration} min` : "Durée inconnue"}
                </span>
                {typeof movie.reviewers_count === "number" && (
                  <span className="text-[11px]">
                    {movie.reviewers_count} avis admin
                  </span>
                )}
              </div>
            </div>

            {/* Synopsis */}
            {movie.synopsis_original && (
              <div className="space-y-1">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                  Synopsis
                </p>
                <p className="line-clamp-5 text-xs text-slate-200">
                  {movie.synopsis_original}
                </p>
              </div>
            )}

            {/* Winner toggle */}
            <div className="mt-1 border-t border-slate-800 pt-3">
              <button
                type="button"
                onClick={() => onToggleWinner(movie)}
                disabled={!canMarkWinner}
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  movie.is_winner
                    ? "border-amber-400/60 bg-amber-400/20 text-amber-200 hover:bg-amber-400/30"
                    : "border-slate-700 bg-slate-900/70 text-slate-100 hover:bg-slate-800/90"
                } disabled:cursor-not-allowed disabled:opacity-60`}
              >
                <Trophy className="h-3.5 w-3.5 shrink-0" />
                {isToggling
                  ? "Mise à jour..."
                  : movie.is_winner
                    ? "Retirer des gagnants"
                    : "Marquer comme gagnant"}
                {!movie.is_winner && winnersCount >= 6 && (
                  <span className="text-[10px] font-normal text-red-300">
                    Limite de 6 gagnants atteinte
                  </span>
                )}
              </button>
              {winnerError && (
                <p className="mt-1 text-xs text-red-300">{winnerError}</p>
              )}
            </div>

            {/* Reviews */}
            <div className="mt-2 flex-1 space-y-2 overflow-hidden border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                  Avis des admins
                </p>
                {typeof movie.reviewers_count === "number" && (
                  <span className="text-[11px] text-brand-muted">
                    {movie.reviewers_count} au total
                  </span>
                )}
              </div>

              {loadingReviews && (
                <p className="py-2 text-xs text-brand-muted">
                  Chargement des avis...
                </p>
              )}
              {reviewsError && !loadingReviews && (
                <p className="py-2 text-xs text-red-300">{reviewsError}</p>
              )}
              {!loadingReviews && !reviewsError && (!reviews || reviews.length === 0) && (
                <p className="py-2 text-xs text-brand-muted">
                  Aucun avis disponible pour le moment.
                </p>
              )}

              {!loadingReviews && reviews && reviews.length > 0 && (
                <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                  {reviews.map((review, idx) => (
                    <div
                      key={`${review.admin_id ?? idx}-${idx}`}
                      className="rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2"
                    >
                      <div className="mb-1 flex items-center justify-between gap-2">
                        <p className="text-[11px] font-semibold text-slate-100">
                          {[review.first_name, review.last_name].filter(Boolean).join(" ") || "Admin"}
                        </p>
                        {typeof review.rating === "number" && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
                            <Star className="h-3 w-3 fill-current" />
                            {review.rating}/10
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-1 flex items-center justify-between text-xs text-brand-muted">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            <ChevronLeft className="h-4 w-4" />
            Précédent
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-full px-2 py-1 hover:bg-slate-900/70"
          >
            Suivant
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

