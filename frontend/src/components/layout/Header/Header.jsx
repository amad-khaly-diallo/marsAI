import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sun, Moon } from 'lucide-react';
import HeaderLogo from './HeaderLogo';
import HeaderNavLinks from './HeaderNavLinks';
import HeaderBurger from './HeaderBurger';
import HeaderLanguageSwitcher from './HeaderLanguageSwitcher';
import { useTheme } from '../../../contexts';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Détection du scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header totalement transparent dans les deux thèmes
  const glassBubbleClass = `
    pointer-events-auto flex items-center gap-2
    rounded-full bg-transparent
    transition-all duration-300
  `;
  const textColor = theme === 'light' ? 'text-white' : 'text-black';

  return (
    <>
      {/* CONTENEUR PRINCIPAL (Invisible & laisse passer les clics sauf sur les bulles) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-4 pointer-events-none md:px-8">
        {/* --- BULLE 1 (GAUCHE) : LOGO --- */}
        <div className={`${glassBubbleClass} px-2 py-2 pr-4`}>
          <Link to="/" className="flex items-center gap-3">
            <HeaderLogo />
          </Link>
        </div>

        {/* --- BULLE 2 (CENTRE) : NAVIGATION (Desktop) --- */}
        <nav
          className={`hidden md:flex absolute left-1/2 -translate-x-1/2 ${glassBubbleClass} px-6 py-3`}
        >
          <HeaderNavLinks orientation="horizontal" />
        </nav>

        {/* --- BULLE 3 (DROITE) : ACTIONS --- */}
        <div className={`${glassBubbleClass} px-2 py-2 pl-3 gap-3`}>
          {/* Bouton Participer (Desktop) */}
          <Link
            to="/participer"
            className="hidden md:flex h-9 items-center justify-center rounded-full bg-brand-primary px-4 text-xs font-bold uppercase tracking-wide text-brand-bg transition-transform hover:scale-105 hover:bg-white"
          >
            {t('nav.participate', 'Participer')}
          </Link>

          {/* Sélecteur de langue */}
          <HeaderLanguageSwitcher />

          {/* Bouton Thème clair/sombre */}
          <button
            onClick={toggleTheme}
            aria-label={
              theme === 'dark'
                ? 'Activer le thème clair'
                : 'Activer le thème sombre'
            }
            className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:text-brand-primary ${textColor}`}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Burger (Mobile) */}
          <div className="flex md:hidden">
            <HeaderBurger open={open} onToggle={() => setOpen(!open)} />
          </div>
        </div>
      </header>

      {/* --- MENU MOBILE --- */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 rounded-3xl border border-white/10 bg-brand-surface/90 p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4">
            <HeaderNavLinks
              orientation="vertical"
              onNavigate={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
