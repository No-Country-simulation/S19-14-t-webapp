import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./modules/home/pages/Home";
import { Search } from "./modules/search/pages/Search";
import Registro from "./modules/auth/pages/Registro";
import { Landing } from "./modules/landing/pages/Landing";
import { Footer } from "./core/components/Footer";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search:rubro" element={<Search />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Landing />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
