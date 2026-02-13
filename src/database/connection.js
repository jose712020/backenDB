const { MongoClient } = require('mongodb'); 

const url = 'mongodb://root:root@127.0.0.1:27017/?authSource=admin';
const client = new MongoClient(url);
let db;

const connectDB = async () => {
    if (db) return db;
    await client.connect();
    db = client.db('dragonball_db'); 
    console.log("Conectado a MongoDB");
    return db;
};

module.exports = { connectDB };