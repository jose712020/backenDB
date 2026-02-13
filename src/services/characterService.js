const Character = require('../database/Character');

const getAllCharacters = async (filterParams) => {
    try {
        const allCharacters = await Character.getAllCharacters(filterParams);
        return allCharacters;
    } catch (error) {
        throw error;
    }
};

const getOneCharacter = async (characterId) => {
    try {
        const character = await Character.getOneCharacter(characterId);
        return character;
    } catch (error) {
        throw error;
    }
};

const createNewCharacter = async (newCharData) => {
    try {
        // Creamos el objeto con la estructura que quieres
        const characterToInsert = {
            name: newCharData.name,
            series: newCharData.series,
            image: newCharData.image,
            description: newCharData.description,
            isAlive: newCharData.isAlive !== undefined ? newCharData.isAlive : true, // Por defecto vivo
            isVillain: newCharData.isVillain !== undefined ? newCharData.isVillain : false, // Por defecto héroe
            age: newCharData.age || null,
            ki: newCharData.ki || null,
            createdAt: new Date().toISOString(), // Formato: 2026-02-03T10:03:28Z
            updatedAt: new Date().toISOString()
        };

        return await Character.createNewCharacter(characterToInsert);
    } catch (error) {
        throw error;
    }
};

const deleteOneCharacter = async (characterId) => {
    try {
        await Character.deleteOneCharacter(characterId);
    } catch (error) {
        throw error;
    }
};

const updateOneCharacter = async (characterId, changes) => {
    try {
        const updatedChanges = {
            ...changes,
            updatedAt: new Date().toISOString()
        };

        return await Character.updateOneCharacter(characterId, updatedChanges);
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllCharacters, getOneCharacter, createNewCharacter, deleteOneCharacter, updateOneCharacter };