const API_URL = "http://localhost:4000/api";

// Llamada generica para reducir duplicacion entre login y registro.
const postJson = async (endpoint, body) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Error en el servicio");
  }
  return data;
};

export const registerUser = (username, password) =>
  postJson("register", { username, password });

export const loginUser = (username, password) =>
  postJson("login", { username, password });
