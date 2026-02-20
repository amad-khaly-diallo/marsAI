import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import { AuthProvider } from "./contexts";
import ScrollToTop from "./components/ui/ScrollToTop";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />

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
