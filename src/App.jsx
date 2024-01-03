import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Sidebar from './components/Sidebar';
import Usuarios from "./pages/Usuarios";
import Sentencias from "./pages/Sentencias";
import ZonasSeguridad from "./pages/ZonasSeguridad";
import PuntosControl from "./pages/PuntosControl";
import Alertas from "./pages/Alertas";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/alertas" element={<Alertas/>} />
          <Route path="/puntosdecontrol" element={<PuntosControl/>} />
          <Route path="/sentencias" element={<Sentencias/>} />
          <Route path="/usuarios" element={<Usuarios/>} />
          <Route path="/zonasdeseguridad" element={<ZonasSeguridad/>} />
        </Routes>   
      </div>
    </Router>
  );
}

export default App;