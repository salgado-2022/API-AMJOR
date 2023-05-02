const db = require("../database/db");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


const postUsuario = (req, res) => {
    const sql = "SELECT ID_Usuario, Correo, contrasena, rol.ID_Rol from usuario INNER JOIN rol ON usuario.ID_Rol = rol.ID_Rol WHERE Correo = ? AND usuario.ID_Rol = 1;";

    db.query(sql, [req.body.email], (err, data) => {

        if (err) return res.json("Login Error in Server");

        if (data.length > 0) {

            bcrypt.compare(req.body.password.toString(), data[0].contrasena, (err, response) => {

                if (err) return res.json({ Error: "Password compare error" })

                if (data[0].ID_Rol == 1 && response) {

                    const correo = data[0].Correo;
                    const token = jwt.sign({ correo }, "jwt-scret-key", { expiresIn: '1d' });
                    res.cookie('token', token);

                    return res.json({ Status: "Admin" });

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