const db = require("../database/db");
const jwt = require("jsonwebtoken")


const getInformacionDelCliente = (req, res) => {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ Error: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, "jwt-scret-key");
        const userId = decoded.userId;

        const sql = "SELECT * FROM usuario WHERE ID_Usuario = ?;";
        db.query(sql,[userId], (err, data) => {
            if (err) return res.status(500).json({ Error: "Server Error" });
            if (data.length === 0) return res.status(404).json({ Error: "User not found" });

            // Aquí puedes devolver la información del cliente al cliente que ha iniciado sesión
            return res.json(data[0]);
        });
    } catch (e) {
        return res.status(401).json({ Error: "Unauthorized" });
    }
};

module.exports = { getInformacionDelCliente };