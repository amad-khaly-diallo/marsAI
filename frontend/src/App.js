import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Submission from "./pages/Submission";
import Admin from "./pages/Admin";
import Jury from "./pages/Jury";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./pages/Partenaires";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submission" element={<Submission />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/jury" element={<Jury />} />
            <Route path="/Partenaires" element={<About />} />
            
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
