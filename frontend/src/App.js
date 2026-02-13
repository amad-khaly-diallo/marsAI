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
            <AppRouter />
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}
