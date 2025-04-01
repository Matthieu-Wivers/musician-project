import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from "./Pages/login";
import { Register } from "./Pages/register";
import Home from "./Pages/home";

function App() {

    return (
        <Router>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
