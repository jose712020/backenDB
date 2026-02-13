const characterService = require('../services/characterService');

const getAllCharacters = async (req, res) => {
    const { series, isVillain, page, size } = req.query; // Extraemos los nuevos parámetros
    try {
        const allCharacters = await characterService.getAllCharacters({ 
            series, 
            isVillain, 
            page, 
            size 
        });
        res.send({ status: "OK", data: allCharacters });
    } catch (error) {
        res.status(500).send({ 
            status: "FAILED", 
            data: { error: error?.message || error } 
        });
    }
};

const getOneCharacter = async (req, res) => {
    const { characterId } = req.params;
    try {
        const character = await characterService.getOneCharacter(characterId);
        res.send({ status: "OK", data: character });
    } catch (error) {
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: { error: error?.message || error }
        });
    }
};

const createNewCharacter = async (req, res) => {
    const { body } = req;
    // Validación basica
    if (!body.name || !body.series) {
        return res.status(400).send({ status: "FAILED", data: { error: "Faltan campos obligatorios" } });
    }

    try {
        const createdCharacter = await characterService.createNewCharacter(body);
        res.status(201).send({ status: "OK", data: createdCharacter });
    } catch (error) {
        res.status(500).send({ status: "FAILED", data: { error: error.message } });
    }
};

const deleteOneCharacter = async (req, res) => {
    const { params: { characterId } } = req;
    
    if (!characterId) {
        return res.status(400).send({ status: "FAILED", data: { error: "El id no puede estar vacío" } });
    }

    try {
        await characterService.deleteOneCharacter(characterId);
        res.status(204).send({ status: "OK" }); 
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneCharacter = async (req, res) => {
    const { body, params: { characterId } } = req;
    
    if (!characterId) {
        return res.status(400).send({ status: "FAILED", data: { error: "ID no proporcionado" } });
    }

    try {
        await characterService.updateOneCharacter(characterId, body);
        res.send({ status: "OK", message: "Personaje actualizado correctamente" });
    } catch (error) {
        res.status(error?.status || 500).send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { getAllCharacters, getOneCharacter, createNewCharacter, deleteOneCharacter, updateOneCharacter };