const db = require("../../database/db");


const searchUserInfoCheckout = (req, res) => {
    const userId = req.params.userId;

    if (!userId) {
        return res.status(401).json({ error: "ID del usuario no proporcionado." });
    }

    try {
        const sql =
            `SELECT u.idUsuario, u.correo, c.ID_Cliente, c.Documento, c.Nombre, c.Apellido, c.Telefono
            FROM usuario u
            LEFT JOIN cliente c ON c.ID_Usuario = u.idUsuario 
            WHERE u.idUsuario = ?;
            `;
        db.query(sql, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al consultar el usuario", err });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "El usuario no existe", err });
            }

            return res.status(200).json(result);

        })
    } catch (error) {
        return res.status(401).json({ error: "hola error nea" });
    }
};

module.exports = { searchUserInfoCheckout };