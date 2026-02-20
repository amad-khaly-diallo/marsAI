import { SectionHeader, ErrorAlert, StatCard } from "../common";
import { useDashboardStats } from "../hooks";

export default function DashboardOverview() {
  const { stats, loading, error } = useDashboardStats();

  return (
    <div className="space-y-4">
      <SectionHeader
        badge="Dashboard"
        title="Vue d'ensemble"
        subtitle="Surveillez l'activité du festival: soumissions, réalisateurs et engagement newsletter."
      />
      <ErrorAlert message={error} />
      <section className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Films soumis"
          value={stats.movies}
          loading={loading}
          description="Nombre total de films enregistrés dans la base."
        />
        <StatCard
          label="Réalisateurs inscrits"
          value={stats.filmmakers}
          loading={loading}
          description='Dossiers de réalisateurs créés via le formulaire "Participer".'
        />
        <StatCard
          label="Newsletter"
          value={stats.newsletter}
          loading={loading}
          description="Réalisateurs ayant accepté de recevoir les communications du festival."
        />
      </section>
    </div>
  );
}
