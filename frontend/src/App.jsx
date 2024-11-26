import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './modules/home/pages/home'
import Registro from './modules/auth/pages/Registro';


export default function App() {
    return (
      <Router>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/registro" element={<Registro/>} />

        </Routes>
      </Router>
    )
}