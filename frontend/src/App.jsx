import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Login } from "./Pages/login";
import { Register } from "./Pages/register";
import Home from "./Pages/home";
import { Profile } from "./Pages/profil";

function App() {

    return (
        <Router>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/" element={<Home/>}/>
              <Route path="/profile/:id" element={<Profile/>}></Route>
            </Routes>
        </Router>
    );
}

export default App;
