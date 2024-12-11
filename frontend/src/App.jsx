import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './modules/home/pages/home'
import Registro from './modules/auth/pages/Registro';
import { Footer } from "./core/components/Footer";
import { Landing } from "./modules/landing/pages/Landing";
import Login from "./modules/auth/pages/Login";
import { Navbar } from "./core/components/Navbar";
import Profilepage from "./modules/landing/pages/ProfilePage/ProfilePage"

export default function App() {
    return (
      <>
      <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/registro" element={<Registro/>} />
            <Route path="/login" element={<Login/>} />       
            <Route path="/profile" element={<Profilepage/>} />    
            <Route path="/nosotros" element={<Landing/>} />

        </Routes>
      <Footer />

      </Router>
      </>
    )
}
