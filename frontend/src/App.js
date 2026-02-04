import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Participer from "./pages/Participer";
import Partenaires from "./pages/Partenaires";
import CGV from "./pages/CGV";
import CGU from "./pages/CGU";
import Admin from "./pages/Admin";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/participer" element={<Participer />} />
            <Route path="/partenaires" element={<Partenaires />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/cgv" element={<CGV />} />
            <Route path="/cgu" element={<CGU />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
