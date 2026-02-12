import { useEffect, useState } from "react";

export default function AdminsManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const admin = require("../../services/admin").default;
      const data = await admin.getAdmins();
      setAdmins(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
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
      const admin = require("../../services/admin").default;
      await admin.createAdmin(form);

      setForm({ first_name: "", last_name: "", email: "", password: "" });
      setCreating(false);
      fetchAdmins();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Gestion des admins
        </h2>
        <p className="text-sm text-brand-muted">
          Créez, éditez ou désactivez les comptes administrateurs.
        </p>
      </header>

      <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
        <div className="mb-3 flex items-center justify-between gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Liste des admins
          </p>
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? "Annuler" : "+ Nouvel admin"}
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
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
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
                {createLoading ? "Création..." : "Créer l'admin"}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-2 py-2">Nom</th>
                <th className="px-2 py-2">Email</th>
                <th className="px-2 py-2">Rôle</th>
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
                    Chargement des administrateurs...
                  </td>
                </tr>
              )}

              {!loading && admins.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-3 text-center text-xs text-brand-muted"
                  >
                    Aucun administrateur trouvé pour le moment.
                  </td>
                </tr>
              )}

              {!loading &&
                admins.map((admin) => (
                  <tr key={admin.id}>
                    <td className="px-2 py-2">
                      {admin.first_name} {admin.last_name}
                    </td>
                    <td className="px-2 py-2">{admin.email}</td>
                    <td className="px-2 py-2 text-xs text-brand-muted">
                      {admin.role}
                    </td>
                    <td className="px-2 py-2 text-right text-xs text-brand-muted">
                      {/* Actions edit/supprimer pourront être ajoutées plus tard */}
                      —
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
