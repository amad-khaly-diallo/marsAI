import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    newsletter: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
      setError(t("contact.form.error.required"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed.email)) {
      setError(t("contact.form.error.email"));
      return;
    }
    if (trimmed.message.length < 20) {
      setError(t("contact.form.error.messageLength"));
      return;
    }

    setSubmitting(true);
    try {
      // Simulation frontend uniquement pour l'instant
      await new Promise((resolve) => setTimeout(resolve, 600));
      setSuccess(t("contact.form.success"));
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        newsletter: form.newsletter,
      });
    } catch {
      setError(t("contact.error.generic"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />

      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_90px_rgba(0,0,0,.18)] backdrop-blur">
            <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
              {t("contact.badge")}
            </p>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight md:text-3xl">
              {t("contact.title")}
            </h1>
            <p className="mt-2 text-sm text-white/70">
              {t("contact.subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-brand-muted">
                    {t("contact.form.name")}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                    minLength={2}
                    maxLength={120}
                    className="rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-primary-soft"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-brand-muted">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                    maxLength={200}
                    className="rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-primary-soft"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-brand-muted">
                  {t("contact.form.subject")}
                </label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  required
                  minLength={3}
                  maxLength={150}
                  className="rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-primary-soft"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-brand-muted">
                  {t("contact.form.message")}
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={handleChange("message")}
                  required
                  minLength={20}
                  maxLength={2000}
                  className="resize-none rounded-md border border-slate-800/80 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 outline-none focus:border-brand-primary-soft"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs text-brand-muted">
                  <input
                    type="checkbox"
                    checked={!!form.newsletter}
                    onChange={handleChange("newsletter")}
                    className="h-3 w-3 rounded border-slate-600 bg-slate-900 text-brand-primary"
                  />
                  {t("contact.form.newsletter")}
                </label>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center rounded-full bg-brand-primary px-5 py-2 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Envoi..." : t("contact.form.submit")}
                </button>
              </div>

              {error && (
                <p className="text-[11px] text-red-300">
                  {error}
                </p>
              )}
              {success && !error && (
                <p className="text-[11px] text-emerald-300">
                  {success}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

