import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = process.env.REACT_APP_GA4_MEASUREMENT_ID || 'G-Q2S789KV4W';
const ENABLED = Boolean(TRACKING_ID);

if (ENABLED) {
  ReactGA.initialize(TRACKING_ID);
}

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
