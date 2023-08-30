const db = require("../../database/db");


const searchPermissions = (req, res) => {

    const sql = "SELECT u.ID_Rol FROM usuario u WHERE u.idUsuario = ? "
    const id = req.params.idUser

    db.query(sql, [id], (err, ress) => {
        if (err) return res.status(500).json({ Error: "Server query error" })

        if (ress.length > 0) {
            const rol = ress[0].ID_Rol
            const sql2 = "SELECT p.NombrePermiso FROM permiso_x_rol pr INNER JOIN rol r ON pr.ID_Rol = r.ID_Rol INNER JOIN permiso p On pr.ID_Permiso = p.ID_Permiso WHERE r.ID_Rol = ?"
            db.query(sql2, [rol], (error, result) => {
                if (error) return result.status(500).json({ Error: "Server query error" })

                return res.status(200).json(result)
            })
        }
    })
}

module.exports = { searchPermissions }