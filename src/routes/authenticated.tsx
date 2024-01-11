import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";
import Home from "../pages/Home";
import Alertas from "../pages/Alertas";
import PuntosControl from "../pages/PuntosControl";
import Sentencias from "../pages/Sentencias";
import Usuarios from "../pages/Usuarios";
import ZonasSeguridad from "../pages/ZonasSeguridad";

export const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/alertas" element={<Alertas/>} />
      <Route path="/puntosdecontrol" element={<PuntosControl/>} />
      <Route path="/sentencias" element={<Sentencias/>} />
      <Route path="/usuarios" element={<Usuarios/>} />
      <Route path="/zonasdeseguridad" element={<ZonasSeguridad/>} />
    </Routes>
  );
}
