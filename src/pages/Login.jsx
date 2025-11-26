import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  // Navega a la pantalla de inicio tras un submit válido (placeholder de autenticación).
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/inicio");
  };

  return (
    <main className="canvas">
      <section className="card">
        <img
          className="card_logo"
          src="/assets/img/LiveWeatherLogo.jpg"
          alt="Logo página"
        />
      </section>

      <form className="login" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo</label>
        <input id="email" type="email" placeholder="correo@ejemplo.com" required />

        <label htmlFor="password">Contraseña</label>
        <input id="password" type="password" placeholder="*******" required />

        <button className="btn" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
}
