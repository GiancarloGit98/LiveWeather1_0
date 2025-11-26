import React from "react";
import { Link } from "react-router-dom";

// Datos estáticos de muestra para la vista de consulta.
const consultaData = {
  temp: 15,
  day: "Lunes",
  date: "01/01/2001",
  time: "12:00 PM",
  humidity: "50%",
  address: "Carrera 123 #59-70",
  city: "Bogotá, Colombia",
  icon: "/assets/img/sun.png",
  minimap: "/assets/img/minimap.png",
};

export default function Consulta() {
  return (
    <div className="consulta">
      <Link className="home" to="/inicio" aria-label="Ir al inicio">
        <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 3l9 7v11a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10l9-7z"
          />
        </svg>
      </Link>

      <main className="hero">
        <div className="wrap">
          <figure className="sun">
            <img src={consultaData.icon} alt="Sol" />
          </figure>

          <section className="panel">
            <div className="temp">
              <span className="value">{consultaData.temp}</span>
              <span className="deg">&#176;C</span>
            </div>

            <div className="row">
              <span className="label script">{consultaData.day}</span>
              <span className="date script">{consultaData.date}</span>
            </div>

            <div className="row">
              <span className="label script">{consultaData.time}</span>
            </div>

            <div className="row">
              <span className="label script">Humedad</span>
              <span className="value script">{consultaData.humidity}</span>
            </div>

            <div className="row">
              <span className="label script">{consultaData.address}</span>
            </div>

            <div className="row">
              <span className="label script">{consultaData.city}</span>
            </div>

            <figure className="mini-map">
              <img src={consultaData.minimap} alt="Mini mapa" />
            </figure>
          </section>
        </div>
      </main>
    </div>
  );
}
