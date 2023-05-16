const jwt = require('jsonwebtoken');

const validarToken = (req, res) => {
    const token = req.body.token;

    // Verificar si el token está presente
    if (!token) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }
    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, 'secretKey');
        // Obtener la fecha de expiración del token
        const { userId } = decodedToken;
        
        // El token es válido y no ha expirado
        return res.status(200).json({ mensaje: 'Token válido', id:userId });
    } catch (error) {
        // Error al verificar el token (por ejemplo, token inválido o manipulado)
        return res.status(401).json({ error: error });
    }
};

module.exports = { validarToken };