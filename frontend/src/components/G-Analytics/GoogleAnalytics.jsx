import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// code d'identification
const TRACKING_ID = "G-Q2S789KV4W"; 
ReactGA.initialize(TRACKING_ID);

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Envoyer les informations de la page à Google
    ReactGA.send({ 
      hitType: "pageview", 
      page: location.pathname + location.search 
    });
    

    console.log("GA: Page View Sent for", location.pathname);
  }, [location]);

  return null;
   // sans graphique
};

export default GoogleAnalytics;