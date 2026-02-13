const { MongoClient } = require('mongodb'); 

const url = process.env.MONGO_URI || 'mongodb://root:root@127.0.0.1:27017/?authSource=admin';

const client = new MongoClient(url);
let db;

const connectDB = async () => {
    try {
        if (db) return db;
        await client.connect();
        db = client.db('dragonball_db'); 
        console.log("Conectado a MongoDB con éxito");
        return db;
    } catch (error) {
        console.error("Error conectando a MongoDB:", error);
        process.exit(1); // Esto ayuda a Render a saber que el servicio falló
    }
};

module.exports = { connectDB };