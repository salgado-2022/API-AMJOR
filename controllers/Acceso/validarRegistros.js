const db = require("../../database/db");

const validarDocumento = (req, res) => {

    const sql = 'SELECT Documento from cliente WHERE Documento = ?'

    db.query(sql, [req.body.Documento], (err, data) => {

        if (err) return res.status(500).json("Login Error in Server");

        if (data.length == 0) {
            return res.status(200).json({ Status: "Success" })
        } else {
            return res.status(200).json({ Status: "Exists" })
        }
    })

}

const validarEmail = (req, res) => {

    const sql2 = 'SELECT correo from usuario WHERE correo = ?'

    db.query(sql2, [req.body.Email], (err, data) => {

        if (err) return res.status(500).json("Login Error in Server");

        if (data.length == 0) {
            return res.status(200).json({ Status: "Success" })
        } else {
            return res.status(200).json({ Status: "Exists" })
        }

    })
}

module.exports = { validarDocumento, validarEmail };
