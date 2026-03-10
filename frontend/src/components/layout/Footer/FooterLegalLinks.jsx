import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FooterLegalLinks() {
  const { t } = useTranslation();
  return (
    <div className="grid gap-6 text-sm text-gray-400 sm:grid-cols-2 md:text-right">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          {t('footer.legal_section')}
        </p>
        <div className="flex flex-col gap-2">
          <Link
            to="/cgv"
            className="transition-colors duration-300 hover:text-blue-400"
          >
            {t('footer.cgv')}
          </Link>
          <Link
            to="/cgu"
            className="transition-colors duration-300 hover:text-blue-400"
          >
            {t('footer.cgu')}
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {t('footer.contact_section')}
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
