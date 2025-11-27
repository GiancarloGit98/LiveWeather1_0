import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  // Gestiona tanto el inicio de sesion como el registro
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback({ type: "", text: "" });
    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setFeedback({ type: "error", text: "Correo y clave son obligatorios" });
      setLoading(false);
      return;
    }

    try {
      if (mode === "register") {
        const result = await registerUser(normalizedEmail, password);
        setFeedback({ type: "success", text: result.message });
        setMode("login");
      } else {
        const result = await loginUser(normalizedEmail, password);
        setFeedback({ type: "success", text: result.message });
        navigate("/inicio");
      }
    } catch (error) {
      setFeedback({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="canvas">
      <section className="card">
        <img
          className="card_logo"
          src="/assets/img/LiveWeatherLogo.jpg"
          alt="Logo pagina"
        />
      </section>

      <form className="login" onSubmit={handleSubmit}>
        <label htmlFor="email">Correo</label>
        <input
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="mode-toggle" role="group" aria-label="Seleccionar accion">
          <button
            type="button"
            className={mode === "login" ? "tab active" : "tab"}
            onClick={() => setMode("login")}
            disabled={loading}
          >
            Iniciar sesion
          </button>
          <button
            type="button"
            className={mode === "register" ? "tab active" : "tab"}
            onClick={() => setMode("register")}
            disabled={loading}
          >
            Registrar
          </button>
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Enviando..." : mode === "login" ? "Iniciar Sesion" : "Crear Cuenta"}
        </button>

        {feedback.text && (
          <p className={feedback.type === "error" ? "feedback error" : "feedback success"}>
            {feedback.text}
          </p>
        )}
      </form>
    </main>
  );
}
