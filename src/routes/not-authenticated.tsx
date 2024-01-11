import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from "../pages/Login";

export const NotAuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
