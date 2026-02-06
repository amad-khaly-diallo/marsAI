import { useEffect, useState } from "react";

export default function PartnersManagement() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [form, setForm] = useState({
    name: "",
    website_url: "",
    logo_url: "",
    description: "",
  });

  const [deletingId, setDeletingId] = useState(null);

  const fetchPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/partners", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => []);

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de récupérer la liste des partenaires."
        );
      }

      setPartners(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateLoading(true);

    try {
      const res = await fetch("/api/partners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de créer le partenaire."
        );
      }

      setForm({ name: "", website_url: "", logo_url: "", description: "" });
      setCreating(false);
      fetchPartners();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce partenaire ?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de supprimer ce partenaire."
        );
      }

      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

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
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? "Annuler" : "+ Nouveau partenaire"}
          </button>
        </div>

        {error && (
          <p className="mb-3 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
            {error}
          </p>
        )}

        {creating && (
          <form
            onSubmit={handleCreate}
            className="mb-4 grid gap-3 rounded-md border border-slate-800/80 bg-slate-950/40 px-3 py-3 text-xs md:grid-cols-2"
          >
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Nom du partenaire
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Site web (optionnel)
              </label>
              <input
                type="url"
                name="website_url"
                value={form.website_url}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                URL du logo (optionnel)
              </label>
              <input
                type="url"
                name="logo_url"
                value={form.logo_url}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="block text-[11px] font-medium text-brand-muted">
                Description (optionnelle)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>

            {createError && (
              <div className="md:col-span-2">
                <p className="rounded-md border border-red-500/60 bg-red-950/40 px-2 py-1.5 text-[11px] text-red-200">
                  {createError}
                </p>
              </div>
            )}

            <div className="md:col-span-2 flex justify-end pt-1">
              <button
                type="submit"
                disabled={createLoading}
                className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {createLoading ? "Création..." : "Ajouter le partenaire"}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-2 py-2">Nom</th>
                <th className="px-2 py-2">Site web</th>
                <th className="px-2 py-2">Description</th>
                <th className="px-2 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
              {loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-3 text-center text-xs text-brand-muted"
                  >
                    Chargement des partenaires...
                  </td>
                </tr>
              )}

              {!loading && partners.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-3 text-center text-xs text-brand-muted"
                  >
                    Aucun partenaire enregistré pour le moment.
                  </td>
                </tr>
              )}

              {!loading &&
                partners.map((partner) => (
                  <tr key={partner.id}>
                    <td className="px-2 py-2">{partner.name}</td>
                    <td className="px-2 py-2 text-xs text-brand-muted">
                      {partner.website_url ? (
                        <a
                          href={partner.website_url}
                          target="_blank"
                          rel="noreferrer"
                          className="underline decoration-dotted underline-offset-2"
                        >
                          {partner.website_url}
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-2 py-2 text-xs text-brand-muted max-w-xs truncate">
                      {partner.description || "—"}
                    </td>
                    <td className="px-2 py-2 text-right text-[11px]">
                      <button
                        type="button"
                        disabled={deletingId === partner.id}
                        onClick={() => handleDelete(partner.id)}
                        className="rounded-full bg-red-500/90 px-2 py-0.5 text-[11px] font-semibold text-slate-900 hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        Supprimer
                      </button>
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

