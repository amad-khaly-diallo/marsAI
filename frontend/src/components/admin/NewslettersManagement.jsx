import { useEffect, useState } from "react";

export default function NewslettersManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/filmmakers");
        const data = await res.json().catch(() => []);

        if (!res.ok) {
          throw new Error(
            data.error ||
              data.message ||
              "Impossible de récupérer les inscrits newsletter."
          );
        }

        if (!cancelled) {
          const list = Array.isArray(data) ? data : [];
          setSubscribers(list.filter((f) => f.newsletter));
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
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Gestion des newsletters
        </h2>
        <p className="text-sm text-brand-muted">
          Consultez les inscrits et préparez vos campagnes d&apos;emailing.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
              Inscrits à la newsletter
            </p>
            <span className="text-[11px] text-brand-muted">
              Basé sur le champ &quot;newsletter&quot; des réalisateurs.
            </span>
          </div>

          {error && (
            <p className="mb-3 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200">
              {error}
            </p>
          )}

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-slate-800/80 text-[11px] uppercase tracking-wide text-brand-muted">
                <tr>
                  <th className="px-2 py-2">Email</th>
                  <th className="px-2 py-2">Nom</th>
                  <th className="px-2 py-2 text-right">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-[13px] text-slate-100">
                {loading && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-2 py-3 text-center text-xs text-brand-muted"
                    >
                      Chargement des inscrits...
                    </td>
                  </tr>
                )}

                {!loading && subscribers.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-2 py-3 text-center text-xs text-brand-muted"
                    >
                      Aucun inscrit à la newsletter trouvé pour le moment.
                    </td>
                  </tr>
                )}

                {!loading &&
                  subscribers.map((sub) => (
                    <tr key={sub.id}>
                      <td className="px-2 py-2">{sub.email}</td>
                      <td className="px-2 py-2">
                        {sub.first_name} {sub.last_name}
                      </td>
                      <td className="px-2 py-2 text-right">
                        <span className="inline-flex rounded-full bg-slate-900/80 px-2 py-0.5 text-[11px] text-brand-muted">
                          Actif
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
            Dernière campagne
          </p>
          <p className="mt-2 text-sm text-brand-muted">
            Vous pourrez afficher ici les statistiques d&apos;ouverture, de
            clics, etc. importées d&apos;un outil d&apos;emailing (Brevo,
            Mailchimp, ...).
          </p>
          <div className="mt-4 h-32 rounded-md border border-dashed border-brand-border/60 bg-slate-950/40" />
        </div>
      </div>
    </div>
  );
}


