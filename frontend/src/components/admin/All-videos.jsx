import { useEffect, useState } from "react";
import { Clock, Eye } from "lucide-react";
import { getYouTubeEmbed } from "../../utils/youtube";
import { STATUS_LABELS } from "../../constants/status";
import admin from "../../services/admin";

export default function AllVideos() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  // recuperer des informations réelles à partir de la base de données
  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = categoryFilter ? { status: categoryFilter } : {};
      const data = await admin.getFilms(params);
      setMovies(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-brand-surface/80 border border-slate-800/80 rounded-xl p-5 shadow-soft-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-50">
            Galerie des vidéos
          </h2>
          <p className="text-sm text-brand-muted">
            Toutes les vidéos récupérées de la base de données.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/50 p-1.5 rounded-lg border border-slate-800">
          <label className="text-xs font-medium text-brand-muted pl-2">
            Filtrer par:
          </label>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-md border-none bg-slate-800 py-1.5 pl-3 pr-8 text-sm text-slate-100 focus:ring-1 focus:ring-brand-primary cursor-pointer outline-none"
          >
            <option value="">Tous les statuts</option>
            <option value="selected">Sélectionnés</option>
            <option value="approved">Approuvés</option>
            <option value="in_process">En cours</option>
            <option value="rejected">Rejetés</option>
          </select>
        </div>
      </div>

      {/*afficher une erreur possible */}
      {error && (
        <p className="rounded-md border border-red-500/60 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {/* chargement */}
      {loading && (
        <div className="text-center py-12 text-brand-muted">
          Chargement des vidéos...
        </div>
      )}

      {/*état vide de la base de données */}
      {!loading && movies.length === 0 && (
        <div className="text-center py-12 text-brand-muted bg-slate-900/50 rounded-xl border border-slate-800">
          Aucune vidéo trouvée dans la base de données.
        </div>
      )}

      {/* =======================
VUE GRILLE          
======================= */}
      {!loading && movies.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {movies.map((movie) => {
            const embedUrl = getYouTubeEmbed(movie.youtube_url);

            return (
              <div
                key={movie.id}
                className="group bg-slate-900/50 border border-slate-700/50 rounded-2xl overflow-hidden shadow-lg hover:shadow-brand-primary/10 hover:border-slate-600 transition-all duration-300 flex flex-col"
              >
                {/* 1. Section vidéo (au-dessus de la carte) */}
                <div className="relative w-full aspect-video bg-black">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      className="w-full h-full"
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

                {/*2. Section d'informations (sous la vidéo) */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Titre + statut */}
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-bold text-slate-100 line-clamp-1 group-hover:text-brand-primary transition-colors">
                      {movie.original_title || "Sans titre"}
                    </h3>

                    {/* Le statu quo */}
                    <span
                      className={`shrink-0 px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        movie.status === "approved"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : movie.status === "selected"
                            ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                            : movie.status === "rejected"
                              ? "bg-red-500/10 text-red-400 border-red-500/20"
                              : movie.status === "in_process"
                                ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                : "bg-slate-800 text-slate-400 border-slate-700"
                      }`}
                    >
                      {STATUS_LABELS[movie.status] || movie.status}
                    </span>
                  </div>

                  {/* Nom du réalisateur */}
                  <div className="text-sm text-brand-muted mb-4">
                    Réalisateur:{" "}
                    <span className="text-slate-300 font-medium">
                      {movie.filmmaker
                        ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                        : "—"}
                    </span>
                  </div>

                  {/* Statistiques de la carte inférieure (durée + visites) */}
                  <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-4">
                      {/* durée */}
                      <span className="flex items-center gap-1.5" title="Durée">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        {movie.duration ? `${movie.duration} min` : "N/A"}
                      </span>

                      {/* Nombre de visites */}
                      <span
                        className="flex items-center gap-1.5 text-brand-primary font-medium"
                        title="Vues"
                      >
                        <Eye className="w-3.5 h-3.5 shrink-0" />
                        {movie.views || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
