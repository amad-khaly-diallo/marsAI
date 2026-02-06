import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AProposPage from "./pages/AProposPage";
import Participer from "./pages/Participer";
import Partenaires from "./pages/Partenaires";
import CGV from "./pages/CGV";
import CGU from "./pages/CGU";
import Admin from "./pages/Admin";
import Jury from "./pages/Jury";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/Partenaires";

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-grow">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* Optionnel: /home */}
            <Route path="/home" element={<Home />} />

            {/* A PROPOS */}
            <Route path="/a-propos" element={<AProposPage />} />
            {/* 404 => retourne à Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/participer" element={<Participer />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/jury" element={<Jury />} />
            <Route path="/Partenaires" element={<About />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/cgu" element={<CGU />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
