const db = require("../../database/db");
const jwt = require("jsonwebtoken");


const listarVentasCliente = (req, res) => {

    const token = req.params.token;
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, "Hola");
        const { userId } = decodedToken;

        const sql =
            "SELECT c.ID_Cliente FROM cliente c INNER JOIN usuario u ON c.ID_Usuario = u.idUsuario INNER JOIN rol r on u.ID_Rol = r.ID_Rol WHERE u.idUsuario = ?";
        db.query(sql, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al consultar el usuario" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "El usuario no existe" });
            }

            const idCliente = result[0].ID_Cliente
            const query = "SELECT P.ID_Pedido, C.ID_Cliente,C.Nombre AS Nombre_Cliente, C.Telefono, P.Direccion_Entrega, P.Municipio,P.Barrio, P.Fecha_Entrega, P.Precio_Total, U.correo, P.Estado, P.Status_Pedido FROM pedido P JOIN cliente C ON P.ID_Cliente = C.ID_Cliente JOIN usuario U ON C.ID_Usuario = U.idUsuario WHERE C.ID_Cliente = ?";
            db.query(query,[idCliente], (err, resultado) => {
                if (err) return res.json({ Message: "Error en el servidor " });
                return res.json(resultado);
            });
        })
    } catch (error) {
        return res.status(401).json({ error: "Error interno" });
    }
}

module.exports = { listarVentasCliente }