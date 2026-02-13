const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../database/User'); // Importamos el nuevo archivo

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscamos al usuario en la BBDD Atlas
        const user = await User.findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ status: "FAILED", data: { error: "Usuario o contraseña incorrectos" } });
        }

        // Comparamos la contraseña con el hash de la BBDD
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ status: "FAILED", data: { error: "Usuario o contraseña incorrectos" } });
        }

        // Generamos el Token
        const token = jwt.sign(
            { user: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.send({ 
            status: "OK", 
            data: { 
                token: token,
                message: "¡Login correcto desde BBDD! Guarda este token."
            } 
        });
    } catch (error) {
        res.status(500).json({ status: "FAILED", data: { error: error.message } });
    }
};

module.exports = { login };