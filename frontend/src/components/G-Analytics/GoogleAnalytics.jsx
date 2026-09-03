import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const TRACKING_ID = "G-Q2S789KV4W"; 
ReactGA.initialize(TRACKING_ID);

// Envoyer des événements d'entonnoir et des données propriétaires 
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
