import http from "http";
import { mkdir, readFile, writeFile } from "fs/promises";
import { createHash } from "crypto";
import path from "path";
import { fileURLToPath } from "url";

// Ubicacion donde esta el archivo json que guarda los registros de usuarios.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "data");
const usersFile = path.join(dataDir, "users.json");
const PORT = process.env.PORT || 4000;

/**
 * Normaliza el usuario y protege la clave con un hash rapido.
 * No es seguridad de produccion, solo evita guardar texto plano.
 */
const hashPassword = (password) =>
  createHash("sha256").update(password).digest("hex");

// Lee el archivo de usuarios; si no existe retorna estructura vacia.
const loadUsers = async () => {
  try {
    const file = await readFile(usersFile, "utf8");
    return JSON.parse(file);
  } catch {
    return { users: {} };
  }
};

// Persiste los usuarios en disco creando la carpeta si es necesario.
const saveUsers = async (users) => {
  await mkdir(dataDir, { recursive: true });
  await writeFile(usersFile, JSON.stringify(users, null, 2), "utf8");
};

// Ayudante para enviar respuestas JSON consistentes.
const sendJson = (res, status, payload) => {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  });
  res.end(JSON.stringify(payload));
};

// Extrae el cuerpo de la peticion y lo convierte en objeto.
const parseBody = (req) =>
  new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      try {
        const body = JSON.parse(data || "{}");
        resolve(body);
      } catch (err) {
        reject(new Error("Cuerpo JSON invalido"));
      }
    });
    req.on("error", reject);
  });

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url || "/", "http://localhost");

  if (req.method === "POST" && url.pathname === "/api/register") {
    try {
      const { username, password } = await parseBody(req);
      if (!username || !password) {
        sendJson(res, 400, { ok: false, message: "Faltan campos" });
        return;
      }

      const users = await loadUsers();
      const key = username.toLowerCase().trim();

      if (users.users[key]) {
        sendJson(res, 409, { ok: false, message: "Usuario ya existe" });
        return;
      }

      users.users[key] = { username: key, password: hashPassword(password) };
      await saveUsers(users);

      sendJson(res, 201, {
        ok: true,
        message: "Registro creado con exito",
      });
    } catch (err) {
      sendJson(res, 500, {
        ok: false,
        message: err.message || "Error al registrar",
      });
    }
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/login") {
    try {
      const { username, password } = await parseBody(req);
      if (!username || !password) {
        sendJson(res, 400, { ok: false, message: "Faltan campos" });
        return;
      }

      const users = await loadUsers();
      const key = username.toLowerCase().trim();
      const user = users.users[key];

      if (!user || user.password !== hashPassword(password)) {
        sendJson(res, 401, { ok: false, message: "Error de autenticacion" });
        return;
      }

      sendJson(res, 200, {
        ok: true,
        message: "Autenticacion satisfactoria",
      });
    } catch (err) {
      sendJson(res, 500, {
        ok: false,
        message: err.message || "Error al iniciar sesion",
      });
    }
    return;
  }

  sendJson(res, 404, { ok: false, message: "Ruta no encontrada" });
});

server.listen(PORT, () => {
  // Se deja log para saber donde corre el servicio al levantarlo.
  console.log(`API de autenticacion escuchando en http://localhost:${PORT}`);
});
