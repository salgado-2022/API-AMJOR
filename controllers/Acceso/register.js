const db = require("../../database/db");
const bcrypt = require("bcrypt");
const salt = 10;


const postRegistro = (req, res) => {

    const { Documento, Nombre, Apellidos, Telefono, Email, Password } = req.body

    console.log(Password)
    console.log(Email)


    bcrypt.hash(Password.toString(), salt, (err, hash) => {

        if (err) return res.json({ Error: "Error en la contraseña" });

        const userValues = [Email, hash];
        console.log(hash)

        const sql = "INSERT INTO usuario  (`correo`, `contrasena`) VALUES (?)"

        db.query(sql, [userValues], (err, result) => {

            if (err) return res.json({ Error: "Error insertando datos en el servidor" });

            const ID_Usuario = result.insertId
            const clientValues = [ID_Usuario, Documento, Nombre, Apellidos, Telefono];

            const sqlInsertClient = "INSERT INTO cliente (`ID_Usuario`, `Documento`, `Nombre`, `Apellido`, `Telefono`) VALUES (?)"

            db.query(sqlInsertClient, [clientValues], (err, clienteResult) => {

                if (err) return res.json({ Error: "Error insertando datos en el servidor" });

                return res.json({ Status: "Success" });

            });
        });
    });
};

module.exports = { postRegistro }