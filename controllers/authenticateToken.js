const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Obtener el token de las cookies

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'jwt-scret-key', (err, decoded) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        // El token es válido, se almacena el ID de usuario en el objeto de solicitud para uso posterior
        req.userId = decoded.userId;
        next();
    });
};

module.exports = { authenticateToken };
