import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/Partenaires";
import Contact from "./pages/Contact";
import { HomePhase2 } from "./components/HomePhase2";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Header />

        <main className="flex-grow">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/films" element={<HomePhase2 />} />
            <Route path="/a-propos" element={<AProposPage />} />
            <Route path="/participer" element={<Participer />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/jury" element={<Jury />} />
            <Route path="/Partenaires" element={<About />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/cgu" element={<CGU />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
          <main className="flex-grow">
            <AppRouter />
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
