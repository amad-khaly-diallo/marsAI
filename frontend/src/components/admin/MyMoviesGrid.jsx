import React from "react";
import { Clock } from "lucide-react";
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

export default function MyMoviesGrid({ movies, onSelect }) {
  if (!movies.length) {
    return (
      <div className="text-center py-12 text-brand-muted bg-slate-900/50 rounded-xl border border-slate-800">
        Aucune vidéo ne vous est encore assignée.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie, index) => {
        const embedUrl = getYouTubeEmbed(movie.youtube_url);
        return (
          <button
            key={movie.id}
            type="button"
            onClick={() => onSelect(index)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 text-left shadow-soft-sm hover:border-brand-primary/60 hover:shadow-brand-primary/15 transition-all"
          >
            <div className="relative w-full aspect-video bg-black">
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
                  Pas de lien YouTube
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="line-clamp-1 text-sm font-semibold text-slate-100 group-hover:text-brand-primary">
                    {movie.original_title || "Sans titre"}
                  </p>
                  <p className="text-[11px] text-brand-muted">
                    {movie.filmmaker
                      ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                      : "—"}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase border ${
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
              </div>

              <p className="line-clamp-2 text-[11px] text-brand-muted">
                {movie.synopsis_original || "Pas de synopsis disponible."}
              </p>

              <div className="mt-auto flex items-center justify-between pt-2 text-[11px] text-slate-400 border-t border-slate-800/70">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  {movie.duration ? `${movie.duration} min` : "Durée ?"}
                </span>
                {typeof movie.my_rating === "number" && (
                  <span className="text-brand-primary font-semibold">
                    Note : {movie.my_rating}/10
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
