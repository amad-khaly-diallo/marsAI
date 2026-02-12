import { useEffect, useState } from "react";

export default function DashboardOverview() {
  const [stats, setStats] = useState({
    movies: null,
    filmmakers: null,
    newsletter: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const admin = require("../../services/admin").default;
        const [movies, filmmakers] = await Promise.all([
          admin.getFilms(),
          admin.getFilmmakers(),
        ]);

        if (!cancelled) {
          const filmmakersList = Array.isArray(filmmakers) ? filmmakers : [];
          setStats({
            movies: Array.isArray(movies) ? movies.length : null,
            filmmakers: filmmakersList.length,
            newsletter: filmmakersList.filter((f) => f.newsletter).length,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          Dashboard
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          Vue d&apos;ensemble
        </h1>
        <p className="max-w-2xl text-sm text-brand-muted">
          Surveillez l&apos;activité du festival: soumissions, réalisateurs et
          engagement newsletter.
        </p>
      </header>

      {error && (
        <p className="rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
          {error}
        </p>
      )}

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Films soumis
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">
            {loading || stats.movies === null ? "—" : stats.movies}
          </p>
          <p className="mt-1 text-xs text-brand-muted">
            Nombre total de films enregistrés dans la base.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Réalisateurs inscrits
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">
            {loading || stats.filmmakers === null ? "—" : stats.filmmakers}
          </p>
          <p className="mt-1 text-xs text-brand-muted">
            Dossiers de réalisateurs créés via le formulaire
            &quot;Participer&quot;.
          </p>
        </div>

        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Newsletter
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-50">
            {loading || stats.newsletter === null ? "—" : stats.newsletter}
          </p>
          <p className="mt-1 text-xs text-brand-muted">
            Réalisateurs ayant accepté de recevoir les communications du
            festival.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-md">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Trafic du site
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            Intégrez ici un graphique (ex: nombre de visites / jour, conversions
            vers la page &quot;Participer&quot;). Pour l&apos;instant, cette
            zone reste un placeholder.
          </p>
          <div className="mt-4 h-40 rounded-md border border-dashed border-brand-border/60 bg-slate-950/40" />
        </div>

        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-md">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Dernières activités
          </p>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            <li>— Nouvelle soumission de court-métrage</li>
            <li>— Nouveau réalisateur inscrit</li>
            <li>— Nouvel inscrit à la newsletter</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
