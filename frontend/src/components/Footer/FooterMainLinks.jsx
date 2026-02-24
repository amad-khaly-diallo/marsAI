import { Link } from "react-router-dom";

export default function FooterMainLinks() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-semibold tracking-wide text-slate-100">
          marsAI
        </p>
        <p className="mt-1 max-w-xs text-xs text-brand-muted">
          Le premier festival mondial dédié aux courts-métrages générés par
          l&apos;intelligence artificielle.
        </p>
      </div>

      <nav className="flex flex-wrap gap-3 text-xs">
        <Link to="/" className="text-slate-300 hover:text-brand-primary-soft">
          Accueil
        </Link>
        <Link
          to="/participer"
          className="text-slate-300 hover:text-brand-primary-soft"
        >
          Participer
        </Link>
        <Link
          to="/partenaires"
          className="text-slate-300 hover:text-brand-primary-soft"
        >
          Partenaires
        </Link>
      </nav>
    </div>
  );
}

