export default function MovieForm({ value, onChange }) {
  const handle = (field) => (e) =>
    onChange({ ...value, [field]: e.target.value });

  return (
    <section className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
      <h2 className="mb-3 text-sm font-semibold text-slate-100">
        2. Film soumis
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Titre original</label>
          <input
            type="text"
            value={value.original_title || ""}
            onChange={handle("original_title")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Titre anglais</label>
          <input
            type="text"
            value={value.english_title || ""}
            onChange={handle("english_title")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Durée (en minutes)
          </label>
          <input
            type="number"
            min="0"
            value={value.duration || ""}
            onChange={handle("duration")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Langue principale</label>
          <input
            type="text"
            value={value.language || ""}
            onChange={handle("language")}
            className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">
            Synopsis (langue originale)
          </label>
          <textarea
            rows={3}
            value={value.synopsis_original || ""}
            onChange={handle("synopsis_original")}
            className="resize-none rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-brand-muted">Synopsis (anglais)</label>
          <textarea
            rows={3}
            value={value.synopsis_english || ""}
            onChange={handle("synopsis_english")}
            className="resize-none rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
          />
        </div>
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <label className="text-xs text-brand-muted">
          Lien YouTube (version finale du film)
        </label>
        <input
          type="url"
          value={value.youtube_url || ""}
          onChange={handle("youtube_url")}
          className="rounded-md border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm text-slate-100"
        />
      </div>
    </section>
  );
}

