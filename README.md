# 🐉 Dragon Ball API REST - Proyecto PSP 2025/2026

[cite_start]Backend profesional desarrollado en **Node.js** utilizando el driver nativo de **MongoDB**[cite: 33]. [cite_start]Este proyecto implementa una API REST completa para la gestión de personajes de Dragon Ball, cumpliendo con los requisitos de seguridad, persistencia en base de datos real y buenas prácticas de programación[cite: 18, 19, 32].

## 🌐 Enlaces de interés
- [cite_start]**API en Producción (Render):** `https://dragonball-api-jl.onrender.com/api/v1/characters` [cite: 72]
- [cite_start]**Documentación Interactiva (Swagger):** `https://dragonball-api-jl.onrender.com/api/v1/docs` [cite: 54]

## 🛠️ Requisitos Técnicos Implementados
- [cite_start]**CRUD Completo:** Implementación de peticiones GET, POST, DELETE y PATCH para la gestión de recursos[cite: 20].
- [cite_start]**Arquitectura Multicapa:** Separación clara en Controladores, Servicios y Capa de Datos (Database) para asegurar la modularización.
- [cite_start]**Modelos de Datos Reales:** Gestión de dos modelos completos en MongoDB Atlas: `Characters` (contenido) y `Users` (autenticación)[cite: 25, 32].
- [cite_start]**Seguridad y Autenticación:** Protección de rutas mediante **JWT** (JSON Web Tokens) y encriptación de contraseñas con **bcryptjs**[cite: 25, 30].
- [cite_start]**Gestión de Auditoría:** Control manual de las fechas de inserción (`createdAt`) y actualización (`updatedAt`) en cada documento[cite: 25].
- [cite_start]**Filtros y Paginación:** Implementación obligatoria de paginación y filtros personalizados por serie (`series`) y rol (`isVillain`)[cite: 22, 23].

## 💻 Manual de Instalación Local

[cite_start]Para replicar y ejecutar este proyecto en un entorno local, sigue estos pasos[cite: 74, 76]:

### 1. Instalación de Dependencias
Clona el repositorio y ejecuta el comando para instalar los módulos necesarios (Express, MongoDB Driver, JWT, Bcrypt, etc.):
```bash
npm install
2. Configuración de Variables de Entorno (.env)
Es obligatorio el uso de un archivo .env en la raíz del proyecto para gestionar credenciales sensibles. Crea el archivo con el siguiente esquema:

Fragmento de código
PORT=3000
MONGO_URI=tu_cadena_de_conexion_mongodb_atlas
JWT_SECRET=tu_clave_secreta_para_firmar_tokens
JWT_EXPIRES_IN=1h

Nota: El archivo .env está incluido en el .gitignore para evitar filtraciones de seguridad en el repositorio público.
+1

3. Ejecución del Servidor
Para iniciar la API en modo producción:

Bash
npm start
Para desarrollo con recarga automática (Nodemon):

Bash
npm run dev
🏗️ Estructura del Proyecto

src/index.js: Punto de entrada, configuración de Express, Middlewares y Swagger.


src/v1/routes/: Definición de rutas y aplicación del middleware de autenticación.


src/controllers/: Gestión de peticiones HTTP y validación básica de entrada.
+1


src/services/: Lógica de negocio y procesamiento de datos antes de ir a BBDD.


src/database/: Conexión y operaciones CRUD utilizando el driver nativo de MongoDB.

🔐 Guía de Uso: Autenticación
Para las operaciones de escritura (POST, PATCH, DELETE), el sistema requiere un token válido:

Realiza un POST a /api/v1/login con credenciales de administrador (ej: admin/admin).

Obtén el token JWT de la respuesta.

Incluye dicho token en el header de tus peticiones: Authorization: Bearer <TOKEN>.


Proyecto desarrollado para el módulo de Programación de Servicios y Procesos (2º DAM) - Curso 2025/2026.
