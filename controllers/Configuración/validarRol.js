const db = require("../../database/db");

const validarRol = (req, res) => {

    const sql = 'SELECT Nombre_Rol from rol WHERE Nombre_Rol = ?'

    db.query(sql, [req.body.Nombre_Rol], (err, data) => {

        if (err) return res.status(500).json("Login Error in Server");

        if (data.length == 0) {
            return res.status(200).json({ Status: "Success" })
        } else {
            return res.status(200).json({ Status: "Exists" })
        }
    })

}

module.exports = { validarRol };
