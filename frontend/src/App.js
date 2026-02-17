import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import About from "./pages/Partenaires";
import Contact from "./pages/Contact";
import { HomePhase2 } from "./components/home/HomePhase2";
import { AuthProvider } from "./contexts";
import VideoDetail from "./pages/VideoDetail";
import { CookieBanner } from "./components/ui/CookieBanner"; // Importation du composant cookie banner

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow">
            <AppRouter />
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
