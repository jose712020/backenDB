const express = require('express');
const router = express.Router();
const characterController = require('../../controllers/characterController');
const authenticateToken = require('../../middlewares/authMiddleware');

/**
 * @swagger
 * /api/v1/characters:
 * get:
 * summary: Obtener todos los personajes
 * tags: [Characters]
 * parameters:
 * - in: query
 * name: series
 * schema:
 * type: string
 * - in: query
 * name: isVillain
 * schema:
 * type: boolean
 * responses:
 * 200:
 * description: Lista de personajes
 */
router.get('/', characterController.getAllCharacters);

/**
 * @swagger
 * /api/v1/characters/{characterId}:
 * get:
 * summary: Obtener un personaje por ID
 * tags: [Characters]
 * parameters:
 * - in: path
 * name: characterId
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Personaje encontrado
 */
router.get('/:characterId', characterController.getOneCharacter);

/**
 * @swagger
 * /api/v1/characters:
 * post:
 * summary: Crear un personaje
 * security:
 * - bearerAuth: []
 * tags: [Characters]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * name:
 * type: string
 * responses:
 * 201:
 * description: Creado
 */
router.post('/', authenticateToken, characterController.createNewCharacter);

/**
 * @swagger
 * /api/v1/characters/{characterId}:
 * delete:
 * summary: Eliminar personaje
 * security:
 * - bearerAuth: []
 * tags: [Characters]
 * parameters:
 * - in: path
 * name: characterId
 * required: true
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Eliminado
 */
router.delete('/:characterId', authenticateToken, characterController.deleteOneCharacter);

router.patch('/:characterId', authenticateToken, characterController.updateOneCharacter);

module.exports = router;