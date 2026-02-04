export default function FilmmakerForm({ value, onChange }) {
  const handle = (field) => (e) =>
    onChange({ ...value, [field]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  return (
    <section className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        1. Réalisateur / Réalisatrice
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Civilité</label>
          <select
            value={value.civility || ""}
            onChange={handle("civility")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          >
            <option value="">Sélectionner</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Prénom</label>
          <input
            type="text"
            value={value.first_name || ""}
            onChange={handle("first_name")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Nom</label>
          <input
            type="text"
            value={value.last_name || ""}
            onChange={handle("last_name")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Date de naissance</label>
          <input
            type="date"
            value={value.birth_date || ""}
            onChange={handle("birth_date")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Email</label>
          <input
            type="email"
            value={value.email || ""}
            onChange={handle("email")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Mobile</label>
          <input
            type="tel"
            value={value.mobile || ""}
            onChange={handle("mobile")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Profession</label>
          <input
            type="text"
            value={value.job || ""}
            onChange={handle("job")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Ville / Pays</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ville"
              value={value.city || ""}
              onChange={handle("city")}
              className="w-1/2 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
            />
            <input
              type="text"
              placeholder="Pays"
              value={value.country || ""}
              onChange={handle("country")}
              className="w-1/2 rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex flex-1 flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Comment avez-vous découvert le festival ?
          </label>
          <input
            type="text"
            value={value.discovery_source || ""}
            onChange={handle("discovery_source")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <label className="mt-5 flex items-center gap-2 text-xs text-brand-muted">
          <input
            type="checkbox"
            checked={!!value.newsletter}
            onChange={handle("newsletter")}
            className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-brand-primary"
          />
          S&apos;abonner à la newsletter
        </label>
      </div>
    </section>
  );
}

