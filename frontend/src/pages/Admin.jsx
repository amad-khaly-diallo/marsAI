import AdminLayout from '../components/layout/AdminLayout';
import {
  DashboardOverview,
  AdminsManagement,
  JuryManagement,
  MoviesManagement,
  PartnersManagement,
  NewslettersManagement,
  AdminLogin,
  GreenFlagGallery,
  VideosDistribution,
  MyMoviesGallery,
} from '../components/admin';
import { AdminProvider, useAdmin } from '../contexts';

function AdminContent() {
  const { admin, checking, isAuthenticated, error, reload } = useAdmin();

  const renderSection = (section) => {
    switch (section) {
      case 'admins':
        return <AdminsManagement />;
      case 'jury':
        return <JuryManagement />;
      case 'my-movies':
        return <MyMoviesGallery />;
      case 'movies':
        return <MoviesManagement currentAdmin={admin} />;
      case 'partners':
        return <PartnersManagement />;
      case 'newsletters':
        return <NewslettersManagement />;
      case 'all-videos':
        return <GreenFlagGallery />;
      case 'videos-distribution':
        return <VideosDistribution currentAdmin={admin} />;
      case 'dashboard':
      default:
        return <DashboardOverview />;
    }
  };

  if (checking) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 pt-32">
        <p className="text-sm text-brand-muted">
          Vérification de l&apos;accès administrateur...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-20 pb-20">
        {error && (
          <div className="px-4 mb-4">
            <p className="mx-auto max-w-sm rounded-md border border-amber-500/60 bg-amber-950/40 px-3 py-2 text-xs text-amber-100">
              {error}
            </p>
          </div>
        )}
        <AdminLogin onSuccess={reload} />
      </div>
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
