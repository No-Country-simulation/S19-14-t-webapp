import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './modules/home/pages/Home'
import Registro from './modules/auth/pages/Registro';
import { Footer } from "./core/components/Footer";
import { Landing } from "./modules/landing/pages/Landing";
import ProfilePage from "./modules/landing/pages/ProfilePage/ProfilePage";

export default function App() {
    return (
      <>
      <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/registro" element={<Registro/>} />
            <Route path="/nosotros" element={<Landing/>} />
            <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Router>
      <Footer />
      </>
    )
}
