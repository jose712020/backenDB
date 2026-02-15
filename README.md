🐉 Dragon Ball API REST - Proyecto PSP 2025/2026
Backend profesional desarrollado en Node.js utilizando el driver nativo de MongoDB. Este proyecto implementa una API REST completa para la gestión de personajes de Dragon Ball, cumpliendo con los requisitos de seguridad, persistencia en base de datos real y buenas prácticas de programación.

🌐 Enlaces de interés
API en Producción (Render): https://dragonball-api-jl.onrender.com/api/v1/characters

Documentación Interactiva (Swagger): https://dragonball-api-jl.onrender.com/api/v1/docs

🛠️ Requisitos Técnicos Implementados
CRUD Completo: Implementación de peticiones GET, POST, DELETE y PATCH para la gestión de personajes.

Arquitectura Multicapa: Separación clara en Controladores, Servicios y Capa de Datos (Database) para asegurar la modularización.

Modelos de Datos Reales: Gestión de dos modelos completos en MongoDB Atlas: Characters (contenido) y Users (autenticación).

Seguridad y Autenticación: Protección de rutas mediante JWT (JSON Web Tokens) y encriptación de contraseñas con bcryptjs.

Gestión de Auditoría: Control manual de las fechas de inserción (createdAt) y actualización (updatedAt) en cada documento.

Filtros y Paginación: Implementación de paginación de resultados y filtros personalizados por serie (series) y tipo de personaje (isVillain).

💻 Manual de Instalación Local
Para replicar y ejecutar este proyecto en un entorno local, sigue estos pasos:

1. Instalación de Dependencias
Clona el repositorio y ejecuta el comando para instalar los módulos necesarios:

Bash
npm install
2. Configuración de Variables de Entorno (.env)
Crea un archivo .env en la raíz del proyecto. Este archivo es ignorado por Git por seguridad. Usa el siguiente esquema:

Fragmento de código
PORT=3000
MONGO_URI=tu_cadena_de_conexion_mongodb_atlas
JWT_SECRET=tu_clave_secreta_para_firmar_tokens
JWT_EXPIRES_IN=1h
3. Ejecución del Servidor
Para iniciar la API en modo producción:

Bash
npm start
Para desarrollo con recarga automática:

Bash
npm run dev
🏗️ Estructura del Proyecto
src/index.js: Punto de entrada, configuración de Express, Middlewares y Swagger.

src/v1/routes/: Definición de rutas y aplicación del middleware de autenticación.

src/controllers/: Gestión de peticiones HTTP y validación de entrada.

src/services/: Lógica de negocio y procesamiento de datos.

src/database/: Conexión y operaciones CRUD con el driver nativo de MongoDB.

🔐 Guía de Uso: Autenticación
Para las operaciones de escritura (POST, PATCH, DELETE), el sistema requiere un token válido:

Realiza un POST a /api/v1/login con tus credenciales de administrador.

Obtén el token JWT de la respuesta JSON.

Incluye dicho token en el Header de tus peticiones:

Authorization: Bearer <TU_TOKEN>

Proyecto desarrollado para el módulo de Programación de Servicios y Procesos (2º DAM) - Curso 2025/2026.
