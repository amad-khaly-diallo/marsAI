import { useEffect, useState } from "react";

export default function NewslettersManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [sendResult, setSendResult] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const admin = require("../../services/admin").default;
        const data = await admin.getNewsletterSubscribers();
        if (!cancelled) {
          const list = Array.isArray(data) ? data : [];
          setSubscribers(list);
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

  const handleSend = async (e) => {
    e.preventDefault();
    setSendError(null);
    setSendResult(null);

    if (!subject.trim() || !body.trim()) {
      setSendError("Sujet et contenu sont obligatoires.");
      return;
    }

    setSending(true);
    try {
      const admin = require("../../services/admin").default;
      const data = await admin.sendNewsletter({ subject, text: body });

      setSendResult(
        typeof data.sent === "number"
          ? `Newsletter envoyée à ${data.sent} abonné(s).`
          : "Newsletter envoyée.",
      );
      setSubject("");
      setBody("");
    } catch (err) {
      setSendError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <header className="space-y-1">
        <h2 className="text-lg font-semibold text-slate-50">
          Gestion des newsletters
        </h2>
        <p className="text-sm text-brand-muted">
          Consultez les inscrits et envoyez des campagnes d&apos;emailing.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <div className="rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
              Inscrits à la newsletter
            </p>
            <span className="text-[11px] text-brand-muted">
              Basé sur les abonnements newsletter des réalisateurs.
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
            Envoyer une newsletter
          </p>
          <p className="mt-1 text-[11px] text-brand-muted">
            Un email sera envoyé à tous les abonnés à la newsletter.
          </p>

          <form onSubmit={handleSend} className="mt-3 space-y-3 text-xs">
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Sujet
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-medium text-brand-muted">
                Contenu du message
              </label>
              <textarea
                rows={5}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full rounded-md border border-slate-800/80 bg-slate-950/60 px-2 py-1.5 text-xs text-slate-100 outline-none focus:border-brand-primary-soft"
                required
              />
            </div>

            {sendError && (
              <p className="rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-[11px] text-red-200">
                {sendError}
              </p>
            )}

            {sendResult && !sendError && (
              <p className="rounded-md border border-emerald-500/60 bg-emerald-950/40 px-3 py-2 text-[11px] text-emerald-200">
                {sendResult}
              </p>
            )}

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? "Envoi..." : "Envoyer la newsletter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
