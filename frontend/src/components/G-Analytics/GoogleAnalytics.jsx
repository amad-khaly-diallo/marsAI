import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// ID de suivi GA4 utilisé par défaut, ou variable d'environnement si définie.
const TRACKING_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID || '';
// Active le tracking seulement si un TRACKING_ID est disponible.
const ENABLED = Boolean(TRACKING_ID);

if (ENABLED) {
  // Initialisation de Google Analytics 4 via react-ga4.
  ReactGA.initialize(TRACKING_ID);
}

// Retourne un nom de page lisible pour les événements personnalisés.
function getPageName(pathname) {
  if (pathname === '/') return 'home';
  if (pathname.startsWith('/participer')) return 'participer';
  if (pathname.startsWith('/catalogue')) return 'catalogue';
  if (pathname.startsWith('/watch/')) return 'watch';
  if (pathname.startsWith('/jury')) return 'jury';
  if (pathname.startsWith('/contact')) return 'contact';
  if (pathname.startsWith('/partenaires')) return 'partenaires';
  if (pathname.startsWith('/a-propos')) return 'a_propos';
  if (pathname.startsWith('/admin')) return 'admin';
  return 'other';
}

// Event helper GA4 (noms cohérents + métadonnées standard).
export const trackEvent = (eventName, eventParams = {}) => {
  if (!ENABLED) return;
  ReactGA.event(eventName, {
    ...eventParams,
    event_source: 'web_app',
  });

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(`[GA4] ${eventName}`, eventParams);
  }
};

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (!ENABLED) return;
    const pagePath = location.pathname;
    const page = pagePath + location.search;
    const pageName = getPageName(location.pathname);
    const pageTitle = `MarsAI - ${pageName}`;

    ReactGA.send({
      hitType: 'pageview',
      page,
      title: pageTitle,
    });

    // Event analytique exploitable dans Explorations GA4.
    trackEvent('page_view_custom', {
      page_name: pageName,
      page_path: pagePath,
      page_query: location.search || '',
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;
