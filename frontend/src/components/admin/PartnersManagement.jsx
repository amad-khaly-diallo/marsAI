export default function PartnersManagement() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Gestion des partenaires
        </h2>
        <p className="text-sm text-brand-muted">
          Suivez les partenaires confirmés, en discussion et leurs niveaux
          d&apos;engagement.
        </p>
      </header>

      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Partenaires
          </p>
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            + Nouveau partenaire
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-2 py-2">Nom</th>
                <th className="px-2 py-2">Type</th>
                <th className="px-2 py-2">Statut</th>
                <th className="px-2 py-2">Contact</th>
                <th className="px-2 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
              <tr>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2">
                  <span className="inline-flex rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-brand-muted">
                    En discussion
                  </span>
                </td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2 text-right text-xs text-brand-muted">
                  Connecter la logique de CRM / contacts si nécessaire.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

