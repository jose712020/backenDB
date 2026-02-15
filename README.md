# 🐉 Dragon Ball API REST - Proyecto PSP 2025/2026

Backend profesional desarrollado en **Node.js** utilizando el driver nativo de **MongoDB**. Este proyecto implementa una API REST completa para la gestión de personajes de Dragon Ball, cumpliendo con los requisitos de seguridad, persistencia en base de datos real y buenas prácticas de programación.

## 🌐 Enlaces de interés
- **API en Producción (Render):** [https://dragonball-api-jl.onrender.com/api/v1/characters](https://dragonball-api-jl.onrender.com/api/v1/characters)
- **Documentación Interactiva (Swagger):** [https://dragonball-api-jl.onrender.com/api/v1/docs](https://dragonball-api-jl.onrender.com/api/v1/docs)

## 🛠️ Requisitos Técnicos Implementados
- **CRUD Completo:** Implementación de peticiones GET, POST, DELETE, PUT y PATCH para la gestión de recursos.
- **Arquitectura Multicapa:** Separación clara en Controladores, Servicios y Capa de Datos (Database) para asegurar la modularización.
- **Modelos de Datos Reales:** Gestión de dos modelos completos en MongoDB Atlas: `Characters` (contenido) y `Users` (autenticación).
- **Seguridad y Autenticación:** Protección de rutas mediante **JWT** (JSON Web Tokens) y encriptación de contraseñas con **bcryptjs**.
- **Gestión de Auditoría:** Control manual de las fechas de inserción (`createdAt`) y actualización (`updatedAt`) en cada documento.
- **Filtros y Paginación:** Implementación obligatoria de paginación y filtros personalizados por serie (`series`) y rol (`isVillain`).

## 🛠️ Tecnologías
- ¡**Runtime:** Node.js
- **Framework:** Express 
- **Base de Datos:** MongoDB Atlas
- **Documentación:** Swagger UI

## 💻 Manual de Instalación Local

Para replicar y ejecutar este proyecto en un entorno local, sigue estos pasos:

### 0. Requisitos Previos
- Tener instalado **Node.js** (v18+) y **npm**.
- Disponer de una base de datos **MongoDB** (Local o Atlas).

### 1. Instalación de Dependencias
Clona el repositorio y ejecuta el comando para instalar los módulos necesarios (Express, MongoDB Driver, JWT, Bcrypt, etc.):
```
npm install
```

### 2. Configuración de Variables de Entorno (.env)
Es obligatorio el uso de un archivo .env en la raíz del proyecto para gestionar credenciales sensibles. Crea el archivo con el siguiente esquema:

```
PORT=3000
MONGO_URI=tu_cadena_de_conexion_mongodb_atlas
JWT_SECRET=tu_clave_secreta_para_firmar_tokens
JWT_EXPIRES_IN=1h
```
(El archivo .env debe estar incluido en el .gitignore para evitar filtraciones de seguridad)

La aplicación se conectará automáticamente a la colección **characters** y **users** dentro de la base de datos definida en el URI. Si la base de datos no existe, el driver nativo la creará al realizar la primera inserción

### 3. Ejecución del Servidor
Para iniciar la API en modo producción:
```
npm start
```

Para desarrollo con recarga automática (Nodemon):
```
npm run dev
```

## 🏗️ Estructura del Proyecto
- **src/index.js:** Punto de entrada, configuración de Express, Middlewares y Swagger.
- **src/v1/routes/:** Definición de rutas y aplicación del middleware de autenticación.
- **src/controllers/:** Gestión de peticiones HTTP y validación básica de entrada.
- **src/services/:** Lógica de negocio y procesamiento de datos antes de ir a BBDD.
- **src/database/:** Conexión y operaciones CRUD utilizando el driver nativo de MongoDB.

## 🔐 Guía de Uso: Autenticación
Para las operaciones de escritura (POST, PATCH, DELETE), el sistema requiere un token válido:

1. Realiza un POST a /api/v1/login con tus credenciales de administrador.
2. Obtén el token JWT de la respuesta.
3. Incluye dicho token en el header de tus peticiones: Authorization: Bearer TOKEN.

Proyecto desarrollado para el módulo de Programación de Servicios y Procesos (2º DAM) - Curso 2025/2026.
