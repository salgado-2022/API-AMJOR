const db = require("../../database/db");

const validarAncheta = (req, res) => {

    const sql = 'SELECT NombreAncheta from ancheta WHERE NombreAncheta = ?'

    db.query(sql, [req.body.NombreAncheta], (err, data) => {

        if (err) return res.status(500).json("Login Error in Server");

        if (data.length == 0) {
            return res.status(200).json({ Status: "Success" })
        } else {
            return res.status(200).json({ Status: "Exists" })
        }
    })

}

module.exports = { validarAncheta };
