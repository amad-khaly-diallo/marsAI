export default function JuryManagement() {
  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">Gestion du jury</h2>
        <p className="text-sm text-brand-muted">
          Ajoutez les membres du jury, leurs bios et leurs spécialités.
        </p>
      </header>

      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Membres du jury
          </p>
          <button
            type="button"
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            + Ajouter un juré
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-2 py-2">Nom</th>
                <th className="px-2 py-2">Spécialité</th>
                <th className="px-2 py-2">Pays</th>
                <th className="px-2 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
              <tr>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2">—</td>
                <td className="px-2 py-2 text-right text-xs text-brand-muted">
                  À connecter au backend (table &quot;jury&quot; ou équivalent).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

