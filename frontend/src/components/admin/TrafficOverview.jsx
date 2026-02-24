export default function TrafficOverview() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Trafic du site
        </h2>
        <p className="text-sm text-brand-muted">
          Vision synthétique des visites, pages clés et conversions importantes
          (participation, inscription newsletter, etc.).
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-md">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Courbe de trafic
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            Intégrez ici votre outil d&apos;analytics (Matomo, Plausible, GA4,
            ...). Placeholder pour un graphique de visites par jour.
          </p>
          <div className="mt-4 h-48 rounded-md border border-dashed border-brand-border/60 bg-slate-950/40" />
        </div>

        <div className="space-y-3 rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-md">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            KPI rapides
          </p>
          <div className="space-y-2 text-sm text-brand-muted">
            <div className="flex items-center justify-between">
              <span>Visites totales</span>
              <span className="text-slate-100">—</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Conversion &quot;Participer&quot;</span>
              <span className="text-slate-100">—%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Inscrits newsletter</span>
              <span className="text-slate-100">—</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

