# Autenticacion basica (Live Weather)

Servicio web sencillo para registro e inicio de sesion, y pantalla de login conectada al backend.

## Como ejecutar
- Instalar dependencias: `npm install`
- Levantar backend: `npm run api` (escucha en `http://localhost:4000`)
- Levantar frontend: `npm run dev` y abre la URL que muestra Vite (por defecto `http://localhost:5173`)

## Flujos
- **Registro**: en la pantalla principal pulsa `Registrar`, envía correo y clave. Se guarda en `data/users.json`.
- **Inicio de sesion**: pulsa `Iniciar sesion` y, si las credenciales son correctas, veras el mensaje de autenticacion y se navega a `/inicio`.

## Notas tecnicas
- Backend sin dependencias externas (`server.js`), respuestas JSON con mensajes de exito/error y CORS abierto para desarrollo.
- Claves guardadas con hash SHA-256 basico (solo para fines de demostracion; no usar en produccion sin endurecer).
- Proyecto versionado con Git; realiza commit tras verificar que todo funciona.
