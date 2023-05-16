const db = require("../../database/db");
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const salt = 10;



const validarCorreo = (req, res) => {
    const email = req.body.email;
    const sql = "SELECT * FROM usuario WHERE Correo = ?";

    db.query(sql, [email], async (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al realizar la consulta en la base de datos" });
        }
        if (data.length > 0) {
            const userId = data[0].ID_Usuario;
            const token = jwt.sign({ userId: userId }, 'secretKey', { expiresIn: '10m' });

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'salgadojuam4@gmail.com',
                    pass: 'vpfykdksxjnkfyeu'
                },
            });

            const resetPasswordLink = `http://localhost:3000/restore/password?token=${token}`;

            let info = await transporter.sendMail({
                from: '"Reset Password" <salgadojuam4@gmail.com>', // sender address
                to: data[0].Correo, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: `<p>Hola, solicitaste un cambio de contraseña.</p><p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetPasswordLink}">${resetPasswordLink}</a>`, // html body
            });
            return res.status(200).json({ existe: true });
        } else {
            return res.status(200).json({ existe: false });
        }
    });
};



const actualizarPassword = (req, res) => {

    const token = req.body.token;
    
    if (!token) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, 'secretKey');
        const { userId } = decodedToken;
        
        const sql = "UPDATE usuario SET contrasena = ? WHERE ID_Usuario = ?"
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
            if(err) return res.json({Error: "Error for hassing password"});
            db.query(sql, [hash,userId], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: "Error al actualizar la contraseña en la base de datos" });
                }
                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: "El usuario no existe" });
                }
                return res.status(200).json({ Status: "Success" });
            });
        })
    } catch (error) {
        return res.status(401).json({ error: error });
    }

}

module.exports = { validarCorreo, actualizarPassword };