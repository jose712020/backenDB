/*
npm create vite@latest nombreProyecto


npm init -y
npm i -D nodemon
npm i express
npm i body-parser
npm i uuid
npm i apicache
npm i swagger-jsdoc swagger-ui-express
npm run dev

Y en el package.json en scripts añadir esto:
    "start": "src/index.js",
    "dev": "nodemon src/index.js",

npm i cors
npm install jsonwebtoken bcryptjs dotenv
npm install swagger-ui-express swagger-jsdoc
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { connectDB } = require('./database/connection');
const authController = require('../src/controllers/authContoller');
const v1CharacterRouter = require('./v1/routes/characterRoutes');

const app = express(); // Primero inicializamos la app

// Configuración de Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dragon Ball API",
            version: "1.0.0",
        },
        servers: [
        {
            url: 'https://dragonball-api-jl.onrender.com',
            description: 'Servidor de Producción (Render)'
        },
        {
            url: 'http://localhost:3000',
            description: 'Servidor Local'
        }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        paths: {
            "/api/v1/login": {
                post: {
                    summary: "Iniciar sesión (Admin)",
                    tags: ["Autenticación"],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        username: { type: "string", example: "admin" },
                                        password: { type: "string", example: "admin" }
                                    }
                                }
                            }
                        }
                    },
                    responses: { 200: { description: "Devuelve el Token JWT" } }
                }
            },
            "/api/v1/characters": {
                get: {
                    summary: "Listar todos los personajes",
                    tags: ["Personajes"],
                    parameters: [
                        { name: "series", in: "query", schema: { type: "string" }, description: "Filtrar por serie" },
                        { name: "isVillain", in: "query", schema: { type: "boolean" }, description: "Filtrar por villano" },
                        { name: "page", in: "query", schema: { type: "integer" }, description: "Nº de página" }
                    ],
                    responses: { 200: { description: "Lista obtenida" } }
                },
                post: {
                    summary: "Crear un nuevo personaje (Requiere Token)",
                    security: [{ bearerAuth: [] }],
                    tags: ["Personajes"],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        series: { type: "string" },
                                        isVillain: { type: "boolean" }
                                    }
                                }
                            }
                        }
                    },
                    responses: { 201: { description: "Personaje creado" }, 401: { description: "No autorizado" } }
                }
            },
            "/api/v1/characters/{characterId}": {
                get: {
                    summary: "Obtener un personaje por ID",
                    tags: ["Personajes"],
                    parameters: [{ name: "characterId", in: "path", required: true, schema: { type: "string" } }],
                    responses: { 200: { description: "Personaje encontrado" }, 404: { description: "No encontrado" } }
                },
                patch: {
                    summary: "Actualizar un personaje (Requiere Token)",
                    security: [{ bearerAuth: [] }],
                    tags: ["Personajes"],
                    parameters: [{ name: "characterId", in: "path", required: true, schema: { type: "string" } }],
                    requestBody: {
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        series: { type: "string" }
                                    }
                                }
                            }
                        }
                    },
                    responses: { 200: { description: "Actualizado correctamente" } }
                },
                delete: {
                    summary: "Eliminar un personaje (Requiere Token)",
                    security: [{ bearerAuth: [] }],
                    tags: ["Personajes"],
                    parameters: [{ name: "characterId", in: "path", required: true, schema: { type: "string" } }],
                    responses: { 200: { description: "Eliminado correctamente" } }
                }
            }
        }
    },
    apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/v1/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.post('/api/v1/login', authController.login);
app.use('/api/v1/characters', v1CharacterRouter);

// Iniciar servidor
connectDB().then(() => {
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Servidor corriendo en http://localhost:3000`);
        console.log(`Documentación en http://localhost:3000/api/v1/docs`);
    });
});