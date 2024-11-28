import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './modules/home/pages/Home'
import Registro from './modules/auth/pages/Registro';
import { Footer } from "./core/components/Footer";
import { Landing } from "./modules/landing/pages/Landing";

export default function App() {
    return (
      <>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/registro" element={<Registro/>} />
            <Route path="/nosotros" element={<Landing/>} />
        </Routes>
      </Router>
      <Footer />
      </>
    )
}
