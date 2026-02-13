const { connectDB } = require('./connection');

const findUserByUsername = async (username) => {
    try {
        const db = await connectDB();
        const user = await db.collection('users').findOne({ username });
        return user;
    } catch (error) {
        throw { status: 500, message: error?.message || error };
    }
};

module.exports = { findUserByUsername };