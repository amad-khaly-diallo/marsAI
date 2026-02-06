import { useEffect, useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardOverview from "../components/admin/DashboardOverview";
import AdminsManagement from "../components/admin/AdminsManagement";
import JuryManagement from "../components/admin/JuryManagement";
import MoviesManagement from "../components/admin/MoviesManagement";
import PartnersManagement from "../components/admin/PartnersManagement";
import NewslettersManagement from "../components/admin/NewslettersManagement";
import TrafficOverview from "../components/admin/TrafficOverview";
import AdminLogin from "../components/admin/AdminLogin";

export default function Admin() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const checkAuth = async () => {
      setCheckingAuth(true);
      setAuthError(null);
      try {
        const res = await fetch("/api/admins", {
          method: "GET",
          credentials: "include",
        });

        if (!cancelled) {
          if (res.ok) {
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

    checkAuth();

    return () => {
      cancelled = true;
    };
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
      case "dashboard":
      default:
        return <DashboardOverview />;
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <p className="text-sm text-brand-muted">
          Vérification de l&apos;accès administrateur...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {authError && (
          <div className="px-4 pt-4">
            <p className="mb-2 rounded-md border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
              {authError}
            </p>
          </div>
        )}
        <AdminLogin onSuccess={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return <AdminLayout>{renderSection}</AdminLayout>;
}


