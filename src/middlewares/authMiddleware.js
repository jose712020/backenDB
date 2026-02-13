const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // El token suele venir en la cabecera 'Authorization' como 'Bearer TOKEN'
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ 
            status: "FAILED", 
            data: { error: "Acceso denegado. No se proporcionó un token." } 
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // ¡Todo ok! Pasamos al siguiente paso (el controlador)
    } catch (error) {
        res.status(403).json({ 
            status: "FAILED", 
            data: { error: "Token no válido o expirado." } 
        });
    }
};

module.exports = authenticateToken;