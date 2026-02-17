import { useEffect, useState } from "react";
import { STATUS_LABELS } from "../../constants/status";

export default function MoviesManagement({ currentAdmin }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);
  const [reviewSavingId, setReviewSavingId] = useState(null);

  const [notification, setNotification] = useState({ id: null, message: null });

  const isBasicAdmin = currentAdmin?.role === "admin";

  const isDecisionLocked = (movie) =>
    movie.status === "selected" || movie.status === "rejected";

  // Fonction d'affichage des notifications
  const showNotification = (id, message) => {
    setNotification({ id, message });
    setTimeout(() => {
      setNotification({ id: null, message: null });
    }, 3000);
  };

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set("status", statusFilter);

      const res = await fetch(`/api/admin/films?${params.toString()}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => []);

      if (!res.ok) throw new Error(data.error || "Erreur de chargement.");

      setMovies(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [statusFilter]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error("Erreur mise à jour.");

      setMovies((prev) =>
        prev.map((movie) => (movie.id === id ? data : movie)),
      );

      showNotification(id, `Statut : ${STATUS_LABELS[status]}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  const updateLocalReviewField = (id, field, value) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, [field]: value } : movie,
      ),
    );
  };

  const saveReview = async (id) => {
    const movie = movies.find((m) => m.id === id);
    if (!movie) return;

    const payload = {
      rating:
        movie.my_rating !== null &&
        movie.my_rating !== undefined &&
        movie.my_rating !== ""
          ? Number(movie.my_rating)
          : null,
      comment: movie.my_comment || null,
    };

    if (
      payload.rating !== null &&
      (Number.isNaN(payload.rating) ||
        payload.rating < 1 ||
        payload.rating > 10)
    ) {
      setError("La note doit être un nombre entre 1 et 10.");
      return;
    }

    setReviewSavingId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/review`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible d'enregistrer votre note/commentaire.",
        );
      }

      showNotification(id, "Votre avis privé a été enregistré.");
    } catch (err) {
      setError(err.message);
    } finally {
      setReviewSavingId(null);
    }
  };

  const deleteMovie = async (id) => {
    if (!window.confirm("Supprimer ce film définitivement ?")) return;
    try {
      const res = await fetch(`/api/admin/films/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) console.warn("Delete API non connectée.");
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const getYouTubeEmbed = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
  };

  return (
    <div className="space-y-4 relative">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          {isBasicAdmin ? "Mes films assignés" : "Gestion des films"}
        </h2>
        <p className="text-sm text-brand-muted">
          {isBasicAdmin
            ? "Visionnez et décidez uniquement des films qui vous sont assignés."
            : "Gérez les soumissions YouTube et les statuts."}
        </p>
      </header>

      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        <div className="mb-6 flex flex-col gap-2 md:flex-row md:justify-between">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            {isBasicAdmin ? "Mes vidéos" : "Liste des films"}
          </p>
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-brand-muted">
              Filtre:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-full border border-slate-800/80 bg-slate-950/60 px-3 py-1.5 text-xs text-slate-100 outline-none"
            >
              <option value="">Tous</option>
              <option value="in_process">En cours</option>
              <option value="approved">Approuvés</option>
              <option value="selected">Sélectionnés</option>
              <option value="rejected">Rejetés</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="mb-3 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        )}
        {loading && (
          <div className="text-center py-8 text-sm text-brand-muted">
            Chargement...
          </div>
        )}

        {!loading && movies.length > 0 && (
          <>
            {/* Vue mobile */}
            <div className="grid grid-cols-1 gap-6 md:hidden">
              {movies.map((movie) => {
                const embedUrl = getYouTubeEmbed(movie.youtube_url);
                const locked = isDecisionLocked(movie);

                return (
                  <div
                    key={movie.id}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-xl overflow-hidden shadow-lg relative"
                  >
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
                          Pas de lien YouTube
                        </div>
                      )}
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-bold text-slate-100">
                            {movie.original_title || "Sans titre"}
                          </h3>
                          <p className="text-xs text-brand-muted">
                            {movie.filmmaker
                              ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                              : "—"}
                          </p>
                        </div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[10px] border ${
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

                      {notification.id === movie.id && (
                        <div className="text-center animate-fade-in-up pb-2">
                          <span className="inline-block px-3 py-1.5 rounded-md bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-sm font-semibold shadow-lg backdrop-blur-sm">
                            {notification.message}
                          </span>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                        {isBasicAdmin ? (
                          <>
                            <button
                              onClick={() => updateStatus(movie.id, "rejected")}
                              disabled={updatingId === movie.id || locked}
                              className="rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors py-2 text-xs font-semibold text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Rejeter
                            </button>
                            <button
                              onClick={() => updateStatus(movie.id, "selected")}
                              disabled={updatingId === movie.id || locked}
                              className="rounded-lg bg-brand-primary/20 hover:bg-brand-primary/30 transition-colors py-2 text-xs font-semibold text-brand-primary border border-brand-primary/40 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              ★ Sélectionner
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => updateStatus(movie.id, "approved")}
                              disabled={updatingId === movie.id}
                              className="rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors py-2 text-xs font-semibold text-emerald-400"
                            >
                              Approuver
                            </button>
                            <button
                              onClick={() => updateStatus(movie.id, "rejected")}
                              disabled={updatingId === movie.id}
                              className="rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors py-2 text-xs font-semibold text-red-400"
                            >
                              Rejeter
                            </button>
                            <button
                              onClick={() => updateStatus(movie.id, "selected")}
                              disabled={updatingId === movie.id}
                              className="col-span-2 rounded-lg bg-brand-primary/20 hover:bg-brand-primary/30 transition-colors py-2 text-xs font-semibold text-brand-primary border border-brand-primary/40"
                            >
                              ★ Sélectionner
                            </button>
                          </>
                        )}
                      </div>

                      {isBasicAdmin && movie.status === "selected" && (
                        <div className="mt-3 space-y-2 border-t border-slate-800 pt-3">
                          <p className="text-[11px] text-brand-muted">
                            Votre note et commentaire{" "}
                            <span className="font-semibold text-slate-100">
                              (privés)
                            </span>
                            .
                          </p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={movie.my_rating ?? ""}
                              onChange={(e) =>
                                updateLocalReviewField(
                                  movie.id,
                                  "my_rating",
                                  e.target.value,
                                )
                              }
                              className="w-20 rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1 text-xs text-slate-100 outline-none"
                              placeholder="Note"
                            />
                            <span className="text-[11px] text-brand-muted">
                              /10
                            </span>
                          </div>
                          <textarea
                            rows={2}
                            value={movie.my_comment ?? ""}
                            onChange={(e) =>
                              updateLocalReviewField(
                                movie.id,
                                "my_comment",
                                e.target.value,
                              )
                            }
                            className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none"
                            placeholder="Votre commentaire (optionnel, visible uniquement par vous)..."
                          />
                          <button
                            type="button"
                            onClick={() => saveReview(movie.id)}
                            disabled={reviewSavingId === movie.id}
                            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-[11px] font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {reviewSavingId === movie.id
                              ? "Enregistrement..."
                              : "Enregistrer mon avis"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Vue desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full text-left text-xs">
                <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
                  <tr>
                    <th className="px-2 py-3 w-64">Aperçu</th>
                    <th className="px-2 py-3">Infos Film</th>
                    <th className="px-2 py-3 text-center">Vues</th>
                    <th className="px-2 py-3 text-center">Statut</th>
                    {isBasicAdmin && (
                      <th className="px-2 py-3 text-center">Mon avis</th>
                    )}
                    <th className="px-2 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
                  {movies.map((movie) => {
                    const embedUrl = getYouTubeEmbed(movie.youtube_url);
                    const locked = isDecisionLocked(movie);

                    return (
                      <tr
                        key={movie.id}
                        className="hover:bg-slate-800/30 transition-colors relative"
                      >
                        <td className="px-2 py-3 align-top">
                          <div className="w-60 h-34 bg-black rounded-xl overflow-hidden border border-slate-700 shadow-sm relative">
                            {embedUrl ? (
                              <iframe
                                src={embedUrl}
                                className="w-full h-full"
                                allowFullScreen
                                title={movie.original_title}
                                frameBorder="0"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[10px] text-gray-500">
                                Pas de lien YouTube
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-2 py-3 align-middle">
                          <div className="font-bold text-sm text-slate-100">
                            {movie.original_title || "Sans titre"}
                          </div>
                          <div className="text-xs text-brand-muted mt-1">
                            {movie.filmmaker
                              ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                              : "—"}
                          </div>
                          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                            <span>⏱</span>{" "}
                            {movie.duration ? `${movie.duration} min` : "N/A"}
                          </div>
                        </td>
                        <td className="px-2 py-3 text-center align-middle font-mono text-gray-400">
                          {movie.views || 0}
                        </td>
                        <td className="px-2 py-3 text-center align-middle">
                          <span
                            className={`inline-flex rounded-full px-3 py-1 text-xs font-bold border ${
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
                        </td>

                        {isBasicAdmin && (
                          <td className="px-2 py-3 align-middle">
                            {movie.status === "selected" ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-1">
                                  <input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={movie.my_rating ?? ""}
                                    onChange={(e) =>
                                      updateLocalReviewField(
                                        movie.id,
                                        "my_rating",
                                        e.target.value,
                                      )
                                    }
                                    className="w-16 rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1 text-xs text-slate-100 outline-none"
                                    placeholder="Note"
                                  />
                                  <span className="text-[11px] text-brand-muted">
                                    /10
                                  </span>
                                </div>
                                <textarea
                                  rows={2}
                                  value={movie.my_comment ?? ""}
                                  onChange={(e) =>
                                    updateLocalReviewField(
                                      movie.id,
                                      "my_comment",
                                      e.target.value,
                                    )
                                  }
                                  className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-[11px] text-slate-100 outline-none"
                                  placeholder="Commentaire privé..."
                                />
                                <button
                                  type="button"
                                  onClick={() => saveReview(movie.id)}
                                  disabled={reviewSavingId === movie.id}
                                  className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1 text-[11px] font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                  {reviewSavingId === movie.id
                                    ? "Enregistrement..."
                                    : "Enregistrer"}
                                </button>
                              </div>
                            ) : (
                              <p className="text-[11px] text-brand-muted">
                                Disponible quand le film est{" "}
                                <span className="font-semibold text-slate-100">
                                  sélectionné
                                </span>
                                .
                              </p>
                            )}
                          </td>
                        )}

                        <td className="px-2 py-3 text-right align-middle relative">
                          {notification.id === movie.id && (
                            <div className="absolute -top-5 right-48 w-auto flex justify-end animate-fade-in-up pointer-events-none">
                              <span className="bg-slate-900 border border-emerald-500/50 text-emerald-400 px-3 py-1.5 rounded-md text-sm font-semibold shadow-xl z-20 whitespace-nowrap">
                                {notification.message}
                              </span>
                            </div>
                          )}

                          <div className="flex items-center justify-end gap-1">
                            {isBasicAdmin ? (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(movie.id, "rejected")
                                  }
                                  title="Rejeter"
                                  disabled={updatingId === movie.id || locked}
                                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(movie.id, "selected")
                                  }
                                  title="Sélectionner"
                                  disabled={updatingId === movie.id || locked}
                                  className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                  >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() =>
                                    updateStatus(movie.id, "approved")
                                  }
                                  title="Approuver"
                                  className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-md transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="20 6 9 17 4 12" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(movie.id, "rejected")
                                  }
                                  title="Rejeter"
                                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() =>
                                    updateStatus(movie.id, "selected")
                                  }
                                  title="Sélectionner"
                                  className="p-2 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="22"
                                    height="22"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    stroke="none"
                                  >
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                  </svg>
                                </button>

                                <div className="w-px h-5 bg-slate-700 mx-1"></div>
                                <button
                                  onClick={() => deleteMovie(movie.id)}
                                  title="Supprimer"
                                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <polyline points="3 6 5 6 21 6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    <line x1="10" y1="11" x2="10" y2="17" />
                                    <line x1="14" y1="11" x2="14" y2="17" />
                                  </svg>
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
