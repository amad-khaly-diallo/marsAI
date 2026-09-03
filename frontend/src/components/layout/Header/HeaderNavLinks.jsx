import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAdmin } from '../../../contexts';
import { useFestivalPhase } from '../../../hooks/useFestivalPhase';
import { trackEvent } from '../../G-Analytics/GoogleAnalytics';

const links = [
  { to: '/catalogue', labelKey: 'nav.catalogue', defaultLabel: 'Catalogue' },
  { to: '/contact', labelKey: 'nav.contact', defaultLabel: 'Contact' },
  { to: '/jury', labelKey: 'nav.jury', defaultLabel: 'Jury' },
  { to: '/partenaires', labelKey: 'nav.partners', defaultLabel: 'Partenaires' },
  { to: '/a-propos', labelKey: 'nav.about', defaultLabel: 'À Propos' },
];

export default function HeaderNavLinks({
  orientation = 'horizontal',
  onNavigate,
}) {
  const { t } = useTranslation();
  const { isAuthenticated: isAdmin, checking } = useAdmin();
  const { phase } = useFestivalPhase();
  const showAdminLink = !checking && isAdmin;

  const base =
    'text-sm font-medium tracking-wide transition-colors duration-200';

  const active = ({ isActive }) =>
    [
      base,
      isActive
        ? 'text-brand-primary font-semibold'
        : 'text-slate-200 hover:text-white',
    ].join(' ');

  const filteredLinks = links.filter((link) => {
    if (link.to === '/jury' || link.to === '/catalogue') {
      // Pas de jury/catalogue en phase1
      if (phase === 'phase1') return false;
    }
    if (link.to === '/catalogue') {
      // Pas de catalogue en phase3
      if (phase === 'phase3') return false;
    }
    return true;
  });

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col gap-4 text-center">
        {filteredLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${isActive ? 'text-brand-primary' : 'text-slate-200'}`
            }
            onClick={onNavigate}
          >
            {t(link.labelKey, link.defaultLabel)}
          </NavLink>
        ))}
        {showAdminLink && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-lg font-medium transition-colors ${isActive ? 'text-brand-primary' : 'text-slate-200'}`
            }
            onClick={onNavigate}
          >
            {t('nav.admin', 'Admin')}
          </NavLink>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {filteredLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={active}
          onClick={() =>
            trackEvent('nav_click', {
              location: 'header',
              target_path: link.to,
              label: link.defaultLabel,
            })
          }
        >
          {t(link.labelKey, link.defaultLabel)}
        </NavLink>
      ))}
      {showAdminLink && (
        <NavLink
          to="/admin"
          className={active}
          onClick={() =>
            trackEvent('nav_click', {
              location: 'header',
              target_path: '/admin',
              label: 'Admin',
            })
          }
        >
          {t('nav.admin', 'Admin')}
        </NavLink>
      )}
    </div>
  );
}
