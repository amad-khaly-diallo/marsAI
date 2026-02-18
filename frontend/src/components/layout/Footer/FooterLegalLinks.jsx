import { Link } from "react-router-dom";

export default function FooterLegalLinks() {
  return (
    <div className="grid gap-4 text-xs text-brand-muted sm:grid-cols-2 md:text-right">
      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Légal
        </p>
        <div className="flex flex-col gap-1">
          <Link to="/cgv" className="hover:text-brand-primary-soft">
            Conditions générales de vente (CGV)
          </Link>
          <Link to="/cgu" className="hover:text-brand-primary-soft">
            Conditions générales d&apos;utilisation (CGU)
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          Contact & réseaux
        </p>
        <div className="flex flex-col gap-1">
          <a
            href="mailto:contact@marsai.festival"
            className="hover:text-brand-primary-soft"
          >
            contact@marsai.festival
          </a>
          <div className="flex gap-3 md:justify-end">
            <a
              href="https://www.instagram.com/marsai.festival/"
              className="hover:text-brand-primary-soft"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com/marsai_festival"
              className="hover:text-brand-primary-soft"
              aria-label="X / Twitter"
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/company/marsai-festival"
              className="hover:text-brand-primary-soft"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

