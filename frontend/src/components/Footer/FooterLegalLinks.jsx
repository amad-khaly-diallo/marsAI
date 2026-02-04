import { Link } from "react-router-dom";

export default function FooterLegalLinks() {
  return (
    <div className="grid gap-6 text-sm text-gray-400 sm:grid-cols-2 md:text-right">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Légal
        </p>
        <div className="flex flex-col gap-2">
          <Link
            to="/cgv"
            className="transition-colors duration-300 hover:text-blue-400"
          >
            Conditions générales de vente
          </Link>
          <Link
            to="/cgu"
            className="transition-colors duration-300 hover:text-blue-400"
          >
            Conditions générales d&apos;utilisation
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Contact & réseaux
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:contact@marsai.festival"
            className="transition-colors duration-300 hover:text-blue-400"
          >
            contact@marsai.festival
          </a>
          <div className="flex gap-4 md:justify-end">
            <a
              href="#"
              className="transition-colors duration-300 hover:text-blue-400"
              aria-label="Instagram"
            >
              Instagram
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-blue-400"
              aria-label="X / Twitter"
            >
              X
            </a>
            <a
              href="#"
              className="transition-colors duration-300 hover:text-blue-400"
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
