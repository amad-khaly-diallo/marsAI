import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AProposPage from '../pages/AProposPage';
import Participer from '../pages/Participer';
import Partenaires from '../pages/Partenaires';
import CGV from '../pages/CGV';
import CGU from '../components/CGU/CGU';
import Admin from '../pages/Admin';
import Jury from '../components/jury/Jury';
import Contact from '../pages/Contact';
import TimerTest from '../pages/TimerTest';
import Gallery from '../pages/Gallery';
import { CookieBanner } from '../components/ui/CookieBanner'; // Importation du composant cookie banner
import VideoDetail from '../pages/VideoDetail';
import About from '../pages/Partenaires';
import Winners from '../pages/Winners';
import { useFestivalPhase } from '../hooks/useFestivalPhase';

function PhaseGuard({ allowPhases, children }) {
  const { phase, loading } = useFestivalPhase();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p>Chargement du festival...</p>
      </div>
    );
  }

  if (!phase || !allowPhases.includes(phase)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function AppRouter() {
  return (
    <Routes>
      {/* HOME */}
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      {/* Catalogue uniquement en phase2 */}
      <Route
        path="/catalogue"
        element={
          <PhaseGuard allowPhases={['phase2']}>
            <Gallery />
          </PhaseGuard>
        }
      />

      <Route path="/a-propos" element={<AProposPage />} />

      {/* Participer interdit à partir de la phase2 */}
      <Route
        path="/participer"
        element={
          <PhaseGuard allowPhases={['phase1']}>
            <Participer />
          </PhaseGuard>
        }
      />

      <Route path="/partenaires" element={<Partenaires />} />
      <Route path="/admin" element={<Admin />} />

      {/* Jury interdit en phase1 */}
      <Route
        path="/jury"
        element={
          <PhaseGuard allowPhases={['phase2', 'phase3']}>
            <Jury />
          </PhaseGuard>
        }
      />

      <Route path="/Partenaires" element={<About />} />
      <Route path="/cgv" element={<CGV />} />
      <Route path="/cgu" element={<CGU />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/videoDetail/:id" element={<VideoDetail />} />
      <Route path="/timer-test" element={<TimerTest />} />
      <Route path="/cookie-consent" element={<CookieBanner />} />
      <Route path="/watch/:id" element={<VideoDetail />} />
      <Route path="/winners" element={<Winners />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
