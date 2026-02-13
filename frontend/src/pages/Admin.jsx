import { useEffect } from "react";
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
import useAuth from "../hooks/useAuth";

export default function Admin() {
  const { checking, isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    // ensure latest auth state
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSection = (section) => {
    switch (section) {
      case "admins":
        return <AdminsManagement />;
      case "jury":
        return <JuryManagement />;
      case "movies":
        return <MoviesManagement />;
      case "partners":
        return <PartnersManagement />;
      case "newsletters":
        return <NewslettersManagement />;
      case "traffic":
        return <TrafficOverview />;
      case "all-videos":
        return <AdminVideos />;
      case "dashboard":
      default:
        return <DashboardOverview />;
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-brand-muted">
          Vérification de l'accès administrateur...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin onSuccess={() => checkAuth()} />;
  }

  return <AdminLayout>{renderSection}</AdminLayout>;
}
