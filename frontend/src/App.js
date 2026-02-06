// FICHIER: frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import AProposPage from "./pages/AProposPage";
import Submission from "./pages/Submission";
import Admin from "./pages/Admin";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

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

            {/* AUTRES */}
            <Route path="/submission" element={<Submission />} />
            <Route path="/admin" element={<Admin />} />

            {/* 404 => retourne à Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
