import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";
import { getYouTubeEmbed } from "../../utils/youtube";
import admin from "../../services/admin";

function FavoriteModal({ favorite, onClose, onSelect, selecting }) {
  if (!favorite) return null;
  const { movie, admin } = favorite;
  const embedUrl = getYouTubeEmbed(movie.youtube_url);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/75 px-3">
      <div className="relative flex w-full max-w-4xl flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-950/95 p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-50">
              {movie.original_title || "Sans titre"}
            </h3>
            <p className="text-xs text-brand-muted">
              Jury :{" "}
              <span className="font-semibold text-slate-100">
                {admin.first_name} {admin.last_name}
              </span>{" "}
              ({admin.email})
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-900/80 px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-slate-100 text-xs"
          >
            Fermer
          </button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
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

          <div className="flex flex-1 flex-col gap-3">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                Réalisateur
              </p>
              <p className="text-xs text-slate-100">
                {movie.filmmaker
                  ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                  : "—"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-brand-muted">
                Synopsis
              </p>
              <p className="text-xs text-slate-200 line-clamp-6">
                {movie.synopsis_original || "Pas de synopsis disponible."}
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-2 border-t border-slate-800 pt-3">
              <p className="text-[11px] text-brand-muted">
                Ce film est marqué{" "}
                <span className="font-semibold text-emerald-300">
                  green flag
                </span>{" "}
                par ce membre du jury.
              </p>
              <button
                type="button"
                onClick={onSelect}
                disabled={selecting}
                className="inline-flex items-center justify-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {selecting ? "Sélection en cours..." : "Marquer comme sélectionné"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AllVideos() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFavorite, setActiveFavorite] = useState(null);
  const [selectingId, setSelectingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 9;

  const fetchFavorites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await admin.getGreenFlagFavorites();
      setGroups(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);
  const flatFavorites = useMemo(
    () =>
      groups.flatMap((g) =>
        (g.movies || []).map((m) => ({ admin: g, movie: m })),
      ),
    [groups],
  );

  const totalPages = Math.max(
    1,
    Math.ceil((flatFavorites.length || 0) / PAGE_SIZE),
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  const paginatedGroups = useMemo(() => {
    if (!flatFavorites.length) return [];
    const start = (currentPage - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageItems = flatFavorites.slice(start, end);

    const byAdmin = new Map();

    pageItems.forEach(({ admin, movie }) => {
      if (!byAdmin.has(admin.admin_id)) {
        byAdmin.set(admin.admin_id, { ...admin, movies: [] });
      }
      byAdmin.get(admin.admin_id).movies.push(movie);
    });

    return Array.from(byAdmin.values());
  }, [flatFavorites, currentPage]);

  const handleOpen = (adminGroup, movie) => {
    setActiveFavorite({ admin: adminGroup, movie });
  };

  const handleSelect = async () => {
    if (!activeFavorite) return;
    const movieId = activeFavorite.movie.id;
    setSelectingId(movieId);
    try {
      await admin.updateFilmStatus(movieId, "selected");
      // on met à jour le statut localement
      setGroups((prev) =>
        prev.map((g) => ({
          ...g,
          movies: g.movies.map((m) =>
            m.id === movieId ? { ...m, status: "selected" } : m,
          ),
        })),
      );
      setActiveFavorite(null);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setSelectingId(null);
    }
  };

  const hasData = flatFavorites.length > 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-800/80 bg-brand-surface/80 p-5 shadow-soft-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-50">
            Galerie des vidéos (coups de cœur jury)
          </h2>
          <p className="text-sm text-brand-muted">
            Vidéos marquées en green flag par les membres du jury, regroupées par
            admin.
          </p>
        </div>
      </div>

      {error && (
        <p className="rounded-md border border-red-500/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {loading && (
        <div className="text-center py-12 text-brand-muted">
          Chargement des favoris du jury...
        </div>
      )}

      {!loading && !hasData && !error && (
        <div className="text-center py-12 text-brand-muted bg-slate-900/50 rounded-xl border border-slate-800">
          Aucun film en green flag pour le moment.
        </div>
      )}

      {!loading &&
        hasData &&
        paginatedGroups.map((group) => (
          <section key={group.admin_id} className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {group.first_name} {group.last_name}
                </h3>
                <p className="text-[11px] text-brand-muted">{group.email}</p>
              </div>
              <span className="text-[11px] text-brand-muted">
                {group.movies.length} film(s) en green flag
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.movies.map((movie) => {
                const embedUrl = getYouTubeEmbed(movie.youtube_url);
                return (
                  <button
                    key={movie.id}
                    type="button"
                    onClick={() => handleOpen(group, movie)}
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
                          {typeof movie.rating === "number" && (
                            <p className="text-[11px] text-emerald-300">
                              Note jury : {movie.rating}/10
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="line-clamp-2 text-[11px] text-brand-muted">
                        {movie.synopsis_original || "Pas de synopsis disponible."}
                      </p>

                      <div className="mt-auto flex items-center justify-between border-t border-slate-800/70 pt-2 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          {movie.duration ? `${movie.duration} min` : "Durée ?"}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}

      {hasData && (
        <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-brand-muted">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80"
          >
            Précédent
          </button>
          <span>
            Page{" "}
            <span className="font-semibold text-slate-100">
              {currentPage}
            </span>{" "}
            / {totalPages}
          </span>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((p) => Math.min(totalPages, p + 1))
            }
            className="rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-800/80"
          >
            Suivant
          </button>
        </div>
      )}

      <FavoriteModal
        favorite={activeFavorite}
        onClose={() => setActiveFavorite(null)}
        onSelect={handleSelect}
        selecting={selectingId != null}
      />
    </div>
  );
}
