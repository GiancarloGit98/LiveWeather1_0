import React from "react";
import { Link } from "react-router-dom";

// Pantalla principal con accesos a las demás vistas.
export default function Inicio() {
  return (
    <div className="inicio">
      <img
        src="/assets/img/LiveWeatherLogo.jpg"
        alt="Logo"
        className="logo"
      />
      <main className="wrapper">
        <div className="gallery">
          <figure className="lg">
            <img src="/assets/img/Lighting.jpg" alt="Rayo" />
          </figure>
          <figure className="sm top">
            <img src="/assets/img/Sunset.jpg" alt="Sol" />
          </figure>
          <figure className="sm bottom">
            <img src="/assets/img/Rain.jpg" alt="Lluvia" />
          </figure>
        </div>

        <nav className="side-menu">
          <Link to="/consulta" className="pill">
            Consulta
          </Link>
          <Link to="/pronostico" className="pill">
            Pronóstico
          </Link>
          <a href="#" className="pill">
            Chat
          </a>
        </nav>

        <div className="actions">
          <a href="#" className="pill ghost">
            Contacto
          </a>
          <Link to="/" className="pill ghost">
            Cerrar sesión
          </Link>
        </div>

        <ul className="social">
          <li>
            <a
              aria-label="Facebook"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/img/facebook.png" alt="Facebook" />
            </a>
          </li>
          <li>
            <a
              aria-label="Instagram"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/img/instagram.png" alt="Instagram" />
            </a>
          </li>
          <li>
            <a
              aria-label="X"
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
            >
              <img src="/assets/img/x.png" alt="X" />
            </a>
          </li>
        </ul>
      </main>
    </div>
  );
}
