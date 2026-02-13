import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import AProposPage from "../pages/AProposPage";
import Participer from "../pages/Participer";
import Partenaires from "../pages/Partenaires";
import CGV from "../pages/CGV";
import CGU from "../pages/CGU";
import Admin from "../pages/Admin";
import Jury from "../pages/Jury";
import Contact from "../pages/Contact";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/a-propos" element={<AProposPage />} />
      <Route path="/participer" element={<Participer />} />
      <Route path="/partenaires" element={<Partenaires />} />
      <Route path="/cgv" element={<CGV />} />
      <Route path="/cgu" element={<CGU />} />
      <Route path="/jury" element={<Jury />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
