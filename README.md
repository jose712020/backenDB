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

## 💻 Manual de Instalación Local

Para replicar y ejecutar este proyecto en un entorno local, sigue estos pasos:

### 1. Instalación de Dependencias
Clona el repositorio y ejecuta el comando para instalar los módulos necesarios (Express, MongoDB Driver, JWT, Bcrypt, etc.):
```bash
npm install
