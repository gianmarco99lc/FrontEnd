import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from "../pages/Home";
import Alertas from "../pages/Alertas";
import Sentencias from "../pages/Sentencias";
import Usuarios from "../pages/Usuarios";
import ZonasSeguridad from "../pages/ZonasSeguridad";
import Conexion from "../pages/Conexion";
import { Salir } from "../pages/Salir";

export const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}/>
      <Route path="/home" element={<Home/>} />
      <Route path="/alertas" element={<Alertas/>} />
      <Route path="/sentencias" element={<Sentencias/>} />
      <Route path="/usuarios" element={<Usuarios/>} />
      <Route path="/zonasdeseguridad" element={<ZonasSeguridad/>} />
      <Route path="/conexion" element={<Conexion/>} />
      <Route path="/salir" element={<Salir />} />
    </Routes>
  );
}
