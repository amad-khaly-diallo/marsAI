import { useEffect, useState } from "react";

const STATUS_LABELS = {
  in_process: "En cours",
  approved: "Approuvé",
  rejected: "Rejeté",
  selected: "Sélectionné",
  pending: "En attente",
};

export default function MoviesManagement() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

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

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de récupérer la liste des films."
        );
      }

      setMovies(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/films/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de mettre à jour le statut du film."
        );
      }

      setMovies((prev) =>
        prev.map((movie) => (movie.id === id ? data : movie))
      );
    } catch (err) {
      // On remonte l'erreur dans le bandeau principal
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Gestion des films
        </h2>
        <p className="text-sm text-brand-muted">
          Visualisez les films soumis, leur statut et les informations
          principales.
        </p>
      </header>

      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
              Liste des films
            </p>
            <span className="text-[11px] text-brand-muted">
              Données servies par l&apos;API sécurisée `/api/admin/films`.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-medium text-brand-muted">
              Statut:
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-full border border-slate-800/80 bg-slate-950/60 px-2 py-1 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
            >
              <option value="">Tous</option>
              <option value="in_process">En cours</option>
              <option value="approved">Approuvés</option>
              <option value="rejected">Rejetés</option>
              <option value="selected">Sélectionnés</option>
            </select>
          </div>
        </div>

        {error && (
          <p className="mb-3 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-2 py-2">Titre</th>
                <th className="px-2 py-2">Réalisateur</th>
                <th className="px-2 py-2">Statut</th>
                <th className="px-2 py-2">Durée</th>
                <th className="px-2 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
              {loading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-3 text-center text-xs text-brand-muted"
                  >
                    Chargement des films...
                  </td>
                </tr>
              )}

              {!loading && movies.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-2 py-3 text-center text-xs text-brand-muted"
                  >
                    Aucun film trouvé avec ces critères.
                  </td>
                </tr>
              )}

              {!loading &&
                movies.map((movie) => (
                  <tr key={movie.id}>
                    <td className="px-2 py-2">
                      {movie.original_title || movie.english_title || "Sans titre"}
                    </td>
                    <td className="px-2 py-2 text-xs text-brand-muted">
                      {movie.filmmaker
                        ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                        : "—"}
                    </td>
                    <td className="px-2 py-2">
                      <span className="inline-flex rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-brand-muted">
                        {STATUS_LABELS[movie.status] || "En attente"}
                      </span>
                    </td>
                    <td className="px-2 py-2">
                      {movie.duration ? `${movie.duration} min` : "—"}
                    </td>
                    <td className="px-2 py-2 text-right text-[11px]">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          disabled={updatingId === movie.id}
                          onClick={() => updateStatus(movie.id, "approved")}
                          className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[11px] font-semibold text-slate-900 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Approuver
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === movie.id}
                          onClick={() => updateStatus(movie.id, "rejected")}
                          className="rounded-full bg-red-500/90 px-2 py-0.5 text-[11px] font-semibold text-slate-900 hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Rejeter
                        </button>
                        <button
                          type="button"
                          disabled={updatingId === movie.id}
                          onClick={() => updateStatus(movie.id, "selected")}
                          className="rounded-full bg-brand-primary px-2 py-0.5 text-[11px] font-semibold text-slate-900 hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Sélectionner
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


