const { connectDB } = require('./connection');
const { ObjectId } = require('mongodb');

const getAllCharacters = async (filterParams) => {
    try {
        const db = await connectDB();
        const query = {};
        
        if (filterParams.series) query.series = filterParams.series;
        if (filterParams.isVillain !== undefined) {
            query.isVillain = filterParams.isVillain === 'true';
        }

        // IMPORTANTE: Convertir a número y poner valores por defecto
        const page = parseInt(filterParams.page) || 1;
        const size = parseInt(filterParams.size) || 50; 
        
        // Calcular cuántos saltar
        const skip = (page - 1) * size;

        const characters = await db.collection('characters')
            .find(query)
            .skip(skip)   // Primero saltamos
            .limit(size)  // Luego limitamos
            .toArray();

        return characters;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

const getOneCharacter = async (characterId) => {
    try {
        const db = await connectDB();
        // Buscamos por el campo _id convirtiendo el string a ObjectId
        const character = await db.collection('characters').findOne({ 
            _id: new ObjectId(characterId) 
        });
        
        if (!character) {
            throw { status: 404, message: `No se encontró el personaje con ID: ${characterId}` };
        }
        
        return character;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const createNewCharacter = async (newChar) => {
    const db = await connectDB();
    const result = await db.collection('characters').insertOne(newChar);
    return { ...newChar, _id: result.insertedId };
};

const deleteOneCharacter = async (characterId) => {
    try {
        const db = await connectDB();
        const result = await db.collection('characters').deleteOne({ 
            _id: new ObjectId(characterId) 
        });
        
        if (result.deletedCount === 0) {
            throw { status: 404, message: `No se encontró el personaje con id ${characterId}` };
        }
        return result;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

const updateOneCharacter = async (characterId, changes) => {
    try {
        const db = await connectDB();
        const result = await db.collection('characters').updateOne(
            { _id: new ObjectId(characterId) },
            { $set: changes }
        );
        
        if (result.matchedCount === 0) {
            throw { status: 404, message: `No se encontró el personaje con id ${characterId}` };
        }
        return result;
    } catch (error) {
        throw { status: error?.status || 500, message: error?.message || error };
    }
};

module.exports = { getAllCharacters, getOneCharacter, createNewCharacter, deleteOneCharacter, updateOneCharacter };