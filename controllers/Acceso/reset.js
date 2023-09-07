const db = require("../../database/db");
const nodemailer = require('nodemailer')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const salt = 10;



const validarCorreo = (req, res) => {
    const email = req.body.email;
    const sql = "SELECT * FROM usuario WHERE correo = ?";

    db.query(sql, [email],  (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error al realizar la consulta en la base de datos" });
        }
        if (data.length > 0) {
            const userId = data[0].idUsuario;
            const token = jwt.sign({ userId: userId }, 'secretKey', { expiresIn: '10m' });

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: 'salgadojuam4@gmail.com',
                    pass: 'vbhfxllcuvnmkcfq'
                },
            });

            const resetPasswordLink = `${process.env.AMJOR_HOMEPAGE_URL}/restore/password?token=${token}`;

            let info =  transporter.sendMail({
                from: '"AMJOR" <salgadojuam4@gmail.com>', // sender address
                to: data[0].correo, // list of receivers
                subject: "Reestablece tu contraseña", // Subject line
                text: "Reestablece tu contraseña", // plain text body
                html: `<!DOCTYPE html>
                <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
                
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
                    <style>
                        * {
                            box-sizing: border-box;
                        }
                
                        body {
                            margin: 0;
                            padding: 0;
                        }
                
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: inherit !important;
                        }
                
                        #MessageViewBody a {
                            color: inherit;
                            text-decoration: none;
                        }
                
                        p {
                            line-height: inherit
                        }
                
                        .desktop_hide,
                        .desktop_hide table {
                            mso-hide: all;
                            display: none;
                            max-height: 0px;
                            overflow: hidden;
                        }
                
                        .image_block img+div {
                            display: none;
                        }
                
                        @media (max-width:660px) {
                
                            .desktop_hide table.icons-inner,
                            .social_block.desktop_hide .social-table {
                                display: inline-block !important;
                            }
                
                            .icons-inner {
                                text-align: center;
                            }
                
                            .icons-inner td {
                                margin: 0 auto;
                            }
                
                            .image_block img.fullWidth {
                                max-width: 100% !important;
                            }
                
                            .mobile_hide {
                                display: none;
                            }
                
                            .row-content {
                                width: 100% !important;
                            }
                
                            .stack .column {
                                width: 100%;
                                display: block;
                            }
                
                            .mobile_hide {
                                min-height: 0;
                                max-height: 0;
                                max-width: 0;
                                overflow: hidden;
                                font-size: 0px;
                            }
                
                            .desktop_hide,
                            .desktop_hide table {
                                display: table !important;
                                max-height: none !important;
                            }
                        }
                    </style>
                </head>
                
                <body style="background-color: #f8f8f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f8f8f9;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                        cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff; color: #000; width: 640px; margin: 0 auto;"
                                                        width="640">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1" width="100%"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                    <table class="image_block block-1" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad" style="width:100%;">
                                                                                <div class="alignment" align="center"
                                                                                    style="line-height:10px"><a target="_blank"
                                                                                        style="outline:none" tabindex="-1"><img
                                                                                            src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/4036/___passwordreset.gif"
                                                                                            style="display: block; height: auto; border: 0; max-width: 640px; width: 100%;"
                                                                                            width="640" alt="Image of lock &amp; key."
                                                                                            title="Image of lock &amp; key."></a></div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="divider_block block-2" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad" style="padding-top:30px;">
                                                                                <div class="alignment" align="center">
                                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                                        role="presentation" width="100%"
                                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                        <tr>
                                                                                            <td class="divider_inner"
                                                                                                style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                                <span>&#8202;</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="paragraph_block block-3" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                                <div
                                                                                    style="color:#555555;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:30px;line-height:120%;text-align:center;mso-line-height-alt:36px;">
                                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                                            style="color:#2b303a;"><strong>¿Olvidaste tu
                                                                                                contraseña?</strong></span></p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="paragraph_block block-4" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                                <div
                                                                                    style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:center;mso-line-height-alt:22.5px;">
                                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                                            style="color:#808389;">Hemos recibido tu
                                                                                            solicitud para restablecer la contraseña.
                                                                                        </span></p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="button_block block-5" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-left:10px;padding-right:10px;padding-top:15px;text-align:center;">
                                                                                <div class="alignment" align="center">
                                                                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:62px;width:209px;v-text-anchor:middle;" arcsize="57%" stroke="false" fillcolor="#f7a50c"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                                                        href="${resetPasswordLink}" target="_blank"
                                                                                        style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#AB1356;border-radius:35px;width:auto;border-top:0px solid transparent;font-weight:undefined;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:15px;padding-bottom:15px;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span
                                                                                            style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span
                                                                                                style="margin: 0; word-break: break-word; line-height: 32px;"><strong>RESTABLECER
                                                                                                    CONTRASEÑA</strong></span></span></a><!--[if mso]></center></v:textbox></v:roundrect><![endif]-->
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="paragraph_block block-4" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:10px;">
                                                                                <div
                                                                                    style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:15px;line-height:150%;text-align:center;mso-line-height-alt:22.5px;">
                                                                                    <p style="margin: 0; word-break: break-word;"><span
                                                                                            style="color:#808389;">
                                                                                            Este enlace caducará en los próximos 15 minutos
                                                                                        </span></p>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                    <table class="divider_block block-6" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-bottom:12px;padding-top:60px;">
                                                                                <div class="alignment" align="center">
                                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                                        role="presentation" width="100%"
                                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                                        <tr>
                                                                                            <td class="divider_inner"
                                                                                                style="font-size: 1px; line-height: 1px; border-top: 0px solid #BBBBBB;">
                                                                                                <span>&#8202;</span>
                                                                                            </td>
                                                                                        </tr>
                                                                                    </table>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0"
                                        role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <table class="row-content stack" align="center" border="0" cellpadding="0"
                                                        cellspacing="0" role="presentation"
                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000; background-color: #410125; width: 640px; margin: 0 auto;"
                                                        width="640">
                                                        <tbody>
                                                            <tr>
                                                                <td class="column column-1" width="100%"
                                                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                    <table class="divider_block block-3" width="100%" border="0"
                                                                        cellpadding="0" cellspacing="0" role="presentation"
                                                                        style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="pad"
                                                                                style="padding-bottom:10px;padding-left:40px;padding-right:40px;padding-top:25px;">
                                                                                <div class="alignment" align="center">
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- End -->
                </body>
                
                </html>`
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

        const sql = "UPDATE usuario SET contrasena = ? WHERE idUsuario = ?"
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) return res.json({ Error: "Error for hassing password" });
            db.query(sql, [hash, userId], (err, result) => {
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