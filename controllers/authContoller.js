const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const ADMIN_USERNAME = "admin";
// Pegamos tu hash generado
const ADMIN_PASSWORD_HASH = "$2b$10$4sL1wT5PVwlmMM607QO9.uRIXBULgWljQb9pn1TwYE5Ig88Gcre0O"; 

const login = async (req, res) => {
    const { username, password } = req.body;

    if (username !== ADMIN_USERNAME) {
        return res.status(401).json({ status: "FAILED", data: { error: "Usuario incorrecto" } });
    }

    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    
    if (!isMatch) {
        return res.status(401).json({ status: "FAILED", data: { error: "Contraseña incorrecta" } });
    }

    const token = jwt.sign(
        { user: username }, 
        process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.send({ 
        status: "OK", 
        data: { 
            token: token,
            message: "¡Login correcto! Guarda este token para tus peticiones POST/DELETE/PATCH"
        } 
    });
};

module.exports = { login };