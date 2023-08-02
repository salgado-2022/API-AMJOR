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
                    const token = jwt.sign({ userId: data[0].idUsuario, Status: "Admin" }, "jwt-scret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    res.status(200).json({ Status: "Success", redirectTo: "http://localhost:3001/dashboard/app" })

                } else {
                    return res.json({ Error: "Password not matched" });
                }
            })
        } else {
            return res.json("No Email Existed");
        }

    })
};


const searchUser = (req, res) => {

    const token = req.params.token;

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, 'jwt-scret-key');
        const { userId } = decodedToken;

        const sql = 'SELECT c.Nombre, c.Apellido, r.Nombre_Rol FROM cliente c INNER JOIN usuario u ON c.ID_Usuario = u.idUsuario INNER JOIN rol r on u.ID_Rol = r.ID_Rol WHERE u.idUsuario = ?';
        db.query(sql, [userId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error al consultar el usuario" });
            }
            if (result.length === 0) {
                return res.status(404).json({ error: "El usuario no existe" });
            }
            
            return res.status(200).json(result);

            

        })
    } catch (error) {
        return res.status(401).json({ error: "hola error nea" });
    }

};

module.exports = { postUsuario, searchUser }