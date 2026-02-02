import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// IMPORTS DES PAGES
import Home from "./pages/Home";
import Partners from "./pages/Partners"; // <--- IL MANQUAIT CETTE LIGNE
import Submission from "./pages/Submission";
import Admin from "./pages/Admin";

// IMPORTS DES COMPOSANTS (Si vous les avez déjà créés)
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-mars-dark text-white">
        {/* Affichage conditionnel du Header si le composant existe */}
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partners" element={<Partners />} />{" "}
            {/* <--- ET CETTE LIGNE */}
            <Route path="/submission" element={<Submission />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
