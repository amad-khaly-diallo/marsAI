import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../contexts/ThemeContext';

const LANGS = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
];

export default function HeaderLanguageSwitcher() {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const current = i18n.language || 'fr';

  const textColor = theme === 'light' ? 'text-white/80' : 'text-black/80';

  const changeLang = (code) => {
    if (code === current) return;
    i18n.changeLanguage(code);
  };

  return (
    <div className="flex items-center gap-1 text-[11px]">
      {LANGS.map((lang) => {
        const active = current.startsWith(lang.code);
        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => changeLang(lang.code)}
            className={[
              'px-2 py-0.5 rounded-full font-light transition-colors',
              active
                ? 'bg-brand-primary text-white font-semibold'
                : `${textColor} hover:text-brand-primary`,
            ].join(' ')}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
