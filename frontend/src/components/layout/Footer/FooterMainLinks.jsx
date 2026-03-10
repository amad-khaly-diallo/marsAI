import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function FooterMainLinks() {
  const { t } = useTranslation();
  return (
    <div className="space-y-5">
      <div>
        <p className="text-base font-semibold tracking-wide text-white">
          marsAI
        </p>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
          {t('footer.description')}
        </p>
      </div>

      <nav className="flex flex-wrap gap-4 text-sm">
        <Link
          to="/"
          className="text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          {t('nav.home')}
        </Link>
        <Link
          to="/participer"
          className="text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          {t('nav.participate')}
        </Link>
        <Link
          to="/partenaires"
          className="text-slate-400 transition-colors duration-300 hover:text-blue-400"
        >
          {t('nav.partners')}
        </Link>
      </nav>
    </div>
  );
}
