import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./modules/home/pages/home";
import Registro from "./modules/auth/pages/Registro";
import { Search } from "./modules/search/pages/Search";
import { Landing } from "./modules/landing/pages/Landing";
import Login from "./modules/auth/pages/Login";
import { Footer } from "./core/components/Footer";
import { Navbar } from "./core/components/Navbar";
import Profilepage from "./modules/landing/pages/ProfilePage/ProfilePage";
import WorkerProfile from "./modules/landing/pages/WorkerProfile/WorkerProfile";
import NewPublication from "./modules/landing/pages/WorkerProfile/NewPublication/NewPublication";
import MyWorks from "./modules/landing/pages/WorkerProfile/MyWorks/MyWorks";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/search/:category" element={<Search />} />
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profilepage />} />
          <Route path="/nosotros" element={<Landing />} />

          <Route path="/perfil-servicio" element={<WorkerProfile />} />
          <Route path="/new-publication" element={<NewPublication />} />
          <Route path="/my-works" element={<MyWorks />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}
