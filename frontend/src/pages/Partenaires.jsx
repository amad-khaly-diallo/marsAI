export default function Partenaires() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 space-y-2">
        <p className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-brand-primary-soft">
          Partenaires
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          Devenir partenaire de marsAI
        </h1>
        <p className="max-w-2xl text-sm text-brand-muted">
          Rejoignez les pionniers qui accompagnent la création d&apos;œuvres
          cinématographiques générées par IA. Contactez-nous pour discuter d&apos;une
          collaboration sur mesure.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <h2 className="text-sm font-semibold text-slate-100">
            Pourquoi devenir partenaire ?
          </h2>
          <ul className="list-disc space-y-1 pl-4 text-sm text-brand-muted">
            <li>Visibilité auprès des talents émergents de l&apos;IA créative.</li>
            <li>Présence sur les supports du festival et les projections.</li>
            <li>Possibilités d&apos;activations, prix spéciaux et workshops.</li>
          </ul>
        </div>

        <div className="space-y-3 rounded-lg border border-slate-800/80 bg-brand-surface/80 p-4 shadow-soft-sm">
          <h2 className="text-sm font-semibold text-slate-100">
            Prendre contact
          </h2>
          <p className="text-sm text-brand-muted">
            Écrivez-nous à{" "}
            <a
              href="mailto:partners@marsai.festival"
              className="text-brand-primary-soft hover:text-brand-accent"
            >
              partners@marsai.festival
            </a>{" "}
            avec une courte présentation de votre organisation et vos idées de
            partenariat.
          </p>
        </div>
      </div>
    </div>
  );
}

