import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-Q2S789KV4W"; 
ReactGA.initialize(TRACKING_ID);

// Envoyer des événements d'entonnoir et des données propriétaires 
export const trackEvent = (eventName, eventParams = {}) => {
  ReactGA.event(eventName, eventParams);
  //dans la console
  if (process.env.NODE_ENV !== 'production') {
    console.log(`GA Event: ${eventName}`, eventParams);
  }
};

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname;
    let pageTitle = "MarsAI - " + pagePath;

    ReactGA.send({ 
      hitType: "pageview", 
      page: pagePath + location.search,
      title: pageTitle 
    });
  }, [location]);

  return null;
};

export default GoogleAnalytics;