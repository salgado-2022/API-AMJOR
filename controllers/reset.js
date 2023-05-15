const db = require("../database/db");
const nodemailer = require('nodemailer')

const validarCorreo = (req, res) => {
    const email = req.body.email;
    const sql = "SELECT * FROM usuario WHERE Correo = ?";

    db.query(sql, [email], async (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al realizar la consulta en la base de datos" });
        }
        if (data.length > 0) {
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'salgadojuam4@gmail.com',
                    pass: 'vpfykdksxjnkfyeu'
                },
            });
            let info = await transporter.sendMail({
                from: '"Reset Password" <salgadojuam4@gmail.com>', // sender address
                to: data[0].Correo, // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Hello world?", // plain text body
                html: "<b>Hello men your request a reset password</b>", // html body
            });
            return res.status(200).json({ existe: true });
        } else {
            return res.status(200).json({ existe: false });
        }
    });
};

module.exports = { validarCorreo };