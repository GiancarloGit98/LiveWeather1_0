import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Inicio from "./pages/inicio";
import Consulta from "./pages/consulta";
import Pronostico from "./pages/pronostico";
import "./estilos.css";

// Se definenlas rutas principales.
const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/inicio" element={<Inicio />} />
      <Route path="/consulta" element={<Consulta />} />
      <Route path="/pronostico" element={<Pronostico />} />
    </Routes>
  </BrowserRouter>
);

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
