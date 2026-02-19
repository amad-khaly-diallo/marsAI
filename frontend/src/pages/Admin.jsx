import AdminLayout from "../components/layout/AdminLayout";
import DashboardOverview from "../components/admin/DashboardOverview";
import AdminsManagement from "../components/admin/AdminsManagement";
import JuryManagement from "../components/admin/JuryManagement";
import MoviesManagement from "../components/admin/MoviesManagement";
import PartnersManagement from "../components/admin/PartnersManagement";
import NewslettersManagement from "../components/admin/NewslettersManagement";
import AdminLogin from "../components/admin/AdminLogin";
import AdminVideos from "../components/admin/All-videos";
import VideosDistribution from "../components/admin/VideosDistribution";
import MyMoviesGallery from "../components/admin/MyMoviesGallery";
import { AdminProvider, useAdmin } from "../contexts";

function AdminContent() {
  const { admin, checking, isAuthenticated, error, reload } = useAdmin();

  const renderSection = (section) => {
    switch (section) {
      case "admins":
        return <AdminsManagement />;
      case "jury":
        return <JuryManagement />;
      case "my-movies":
        return <MyMoviesGallery />;
      case "movies":
        return <MoviesManagement currentAdmin={admin} />;
      case "partners":
        return <PartnersManagement />;
      case "newsletters":
        return <NewslettersManagement />;
      case "all-videos":
        return <AdminVideos />;
      case "videos-distribution":
        return <VideosDistribution currentAdmin={admin} />;
      case "dashboard":
      default:
        return <DashboardOverview />;
    }
  };

  if (checking) {
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
        {error && (
          <div className="px-4 pt-4">
            <p className="mb-2 rounded-md border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
              {error}
            </p>
          </div>
        )}
        <AdminLogin onSuccess={reload} />
      </>
    );
  }

  return <AdminLayout currentAdmin={admin}>{renderSection}</AdminLayout>;
}

export default function Admin() {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
}
