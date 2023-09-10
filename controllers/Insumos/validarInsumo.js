const db = require("../../database/db");

const validarInsumo = (req, res) => {

    const sql = 'SELECT NombreInsumo from insumo WHERE NombreInsumo = ?'

    db.query(sql, [req.body.NombreInsumo], (err, data) => {

        if (err) return res.status(500).json("Login Error in Server");

        if (data.length == 0) {
            return res.status(200).json({ Status: "Success" })
        } else {
            return res.status(200).json({ Status: "Exists" })
        }
    })

}

module.exports = { validarInsumo };
