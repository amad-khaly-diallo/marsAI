import { useState } from "react";

export default function VideosDistribution({ currentAdmin }) {
  const [minReviewers, setMinReviewers] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const isSuperAdmin = currentAdmin?.role === "super_admin";

  const handleDistribute = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/admin/films/distribute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ minReviewers: Number(minReviewers) || 2 }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de lancer la répartition automatique."
        );
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Répartition automatique des vidéos
        </h2>
        <p className="text-sm text-brand-muted">
          Distribue chaque vidéo de la base de données à au moins{" "}
          <span className="font-semibold text-slate-100">
            {minReviewers} admin(s)
          </span>{" "}
          en équilibrant au mieux la charge entre eux.
        </p>
      </header>

      {!isSuperAdmin && (
        <p className="rounded-md border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
          Seul un compte <span className="font-semibold">super_admin</span> est
          autorisé à lancer la répartition. Si vous pensez que c&apos;est une
          erreur, vérifiez vos droits ou contactez un super admin.
        </p>
      )}

      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <label className="block text-[11px] font-medium text-brand-muted">
              Nombre minimum d&apos;admins par vidéo
            </label>
            <input
              type="number"
              min={1}
              value={minReviewers}
              onChange={(e) => setMinReviewers(e.target.value)}
              className="w-28 rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
            />
            <p className="text-[11px] text-brand-muted max-w-md">
              Pour ton besoin, laisse la valeur à{" "}
              <span className="font-semibold text-slate-100">2</span> afin que
              chaque vidéo soit vue par au moins deux admins.
            </p>
          </div>

          <button
            type="button"
            disabled={loading || !isSuperAdmin}
            onClick={handleDistribute}
            className="inline-flex items-center rounded-full bg-brand-primary px-4 py-2 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Répartition en cours..." : "Lancer la répartition"}
          </button>
        </div>

        {error && (
          <p className="rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        )}

        {result && (
          <div className="rounded-md border border-emerald-500/40 bg-emerald-950/30 px-3 py-3 text-xs text-emerald-100 space-y-1">
            <p className="font-semibold text-emerald-200">
              Répartition effectuée avec succès.
            </p>
            <p>
              Films concernés :{" "}
              <span className="font-mono">
                {result.moviesCount ?? "—"}
              </span>
            </p>
            <p>
              Nouvelles assignations créées :{" "}
              <span className="font-mono">
                {result.assignmentsCreated ?? "0"}
              </span>
            </p>
            <p>
              Nombre minimum d&apos;admins par vidéo :{" "}
              <span className="font-mono">
                {result.reviewersRequired ?? minReviewers}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

