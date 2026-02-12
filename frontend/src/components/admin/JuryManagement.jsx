import { useEffect, useState } from "react";

export default function JuryManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    role: "",
    bio: "",
    photo_url: "",
  });

  const [deletingId, setDeletingId] = useState(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/jury", {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json().catch(() => []);

      if (!res.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de récupérer la liste des membres du jury."
        );
      }

      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
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
      const res = await fetch("/api/jury", {
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
            "Impossible de créer le membre du jury."
        );
      }

      setForm({
        first_name: "",
        last_name: "",
        role: "",
        bio: "",
        photo_url: "",
      });
      setCreating(false);
      fetchMembers();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce membre du jury ?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/jury/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok && res.status !== 204) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error ||
            data.message ||
            "Impossible de supprimer ce membre du jury."
        );
      }

      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

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
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? "Annuler" : "+ Ajouter un juré"}
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
                Rôle / spécialité
              </label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                URL de la photo (optionnel)
              </label>
              <input
                type="url"
                name="photo_url"
                value={form.photo_url}
                onChange={handleChange}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="block text-[11px] font-medium text-brand-muted">
                Bio (courte)
              </label>
              <textarea
                name="bio"
                value={form.bio}
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
                {createLoading ? "Création..." : "Ajouter au jury"}
              </button>
            </div>
          </form>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-2 py-2">Nom</th>
                <th className="px-2 py-2">Rôle</th>
                <th className="px-2 py-2">Bio</th>
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
                    Chargement des membres du jury...
                  </td>
                </tr>
              )}

              {!loading && members.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 py-3 text-center text-xs text-brand-muted"
                  >
                    Aucun membre du jury défini pour le moment.
                  </td>
                </tr>
              )}

              {!loading &&
                members.map((member) => (
                  <tr key={member.id}>
                    <td className="px-2 py-2">
                      {member.first_name} {member.last_name}
                    </td>
                    <td className="px-2 py-2 text-xs text-brand-muted">
                      {member.role || "—"}
                    </td>
                    <td className="px-2 py-2 text-xs text-brand-muted max-w-xs truncate">
                      {member.bio || "—"}
                    </td>
                    <td className="px-2 py-2 text-right text-[11px]">
                      <button
                        type="button"
                        disabled={deletingId === member.id}
                        onClick={() => handleDelete(member.id)}
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

