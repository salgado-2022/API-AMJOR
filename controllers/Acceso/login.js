const db = require("../../database/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const postUsuario = (req, res) => {
    const sql = "SELECT idUsuario , correo, contrasena, rol.ID_Rol from usuario INNER JOIN rol ON usuario.ID_Rol = rol.ID_Rol WHERE Correo = ? AND usuario.ID_Rol = 1;";

    db.query(sql, [req.body.email], (err, data) => {

        if (err) return res.status(500).json("Login Error in Server");

        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].contrasena, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" })

                if (data[0].ID_Rol == 1 && response) {
                    const token = jwt.sign({ userId: data[0].idUsuario, Status: "Admin"}, "jwt-scret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    res.status(200).json({ Status: "Success", redirectTo: "http://localhost:3000/dashboard/app" })
                    
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            })
        } else {
            return res.json("No Email Existed");
        }

    })
}

module.exports = { postUsuario }