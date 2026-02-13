import { useEffect } from "react";
import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardOverview from "../components/admin/DashboardOverview";
import AdminsManagement from "../components/admin/AdminsManagement";
import JuryManagement from "../components/admin/JuryManagement";
import MoviesManagement from "../components/admin/MoviesManagement";
import PartnersManagement from "../components/admin/PartnersManagement";
import NewslettersManagement from "../components/admin/NewslettersManagement";
import TrafficOverview from "../components/admin/TrafficOverview";
import AdminLogin from "../components/admin/AdminLogin";
import AdminVideos from "../components/admin/All-videos";
import VideosDistribution from "../components/admin/VideosDistribution";
import MyMoviesGallery from "../components/admin/MyMoviesGallery";

export default function Admin() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [currentAdmin, setCurrentAdmin] = useState(null);

  let cancelled = false;
  const checkAuth = async () => {
      setCheckingAuth(true);
      setAuthError(null);
      try {
        const res = await fetch("/api/admins/me", {
          method: "GET",
          credentials: "include",
        });

        if (!cancelled) {
          if (res.ok) {
            const data = await res.json().catch(() => null);
            if (data) {
              setCurrentAdmin(data);
            }
            setIsAuthenticated(true);
          } else if (res.status === 401 || res.status === 403) {
            setIsAuthenticated(false);
          } else {
            setAuthError("Impossible de vérifier l'authentification admin.");
          }
        }
      } catch (err) {
        if (!cancelled) {
          setAuthError("Erreur réseau lors de la vérification de l'accès admin.");
        }
      } finally {
        if (!cancelled) setCheckingAuth(false);
      }
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSection = (section) => {
    switch (section) {
      case "admins":
        return <AdminsManagement />;
      case "jury":
        return <JuryManagement />;
      case "my-movies":
        return <MyMoviesGallery />;
      case "movies":
        return <MoviesManagement currentAdmin={currentAdmin} />;
      case "partners":
        return <PartnersManagement />;
      case "newsletters":
        return <NewslettersManagement />;
      case "traffic":
        return <TrafficOverview />;
      case "all-videos":
        return <AdminVideos currentAdmin={currentAdmin} />;
      case "videos-distribution":
        return <VideosDistribution currentAdmin={currentAdmin} />;
      case "dashboard":
      default:
        return <DashboardOverview />;
    }
  };



  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => checkAuth()} />;
  }

  return <AdminLayout currentAdmin={currentAdmin}>{renderSection}</AdminLayout>;
}
