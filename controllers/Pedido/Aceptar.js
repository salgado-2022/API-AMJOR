const db = require("../../database/db");
const nodemailer = require('nodemailer');


const aceptar = (req, res) => {
    const { pedido, cliente } = req.query;

    const updateSql = "UPDATE pedido SET Estado = 4 WHERE ID_Pedido = ?";

    db.query(updateSql, [pedido], (updateError, updateResult) => {
        if (updateError) {
            return res.status(500).json({ Error: "Error updating order status" });
        }

        const selectSql = "SELECT c.Nombre, u.correo,p.Fecha_Entrega, p.Direccion_Entrega, p.Municipio, p.Barrio FROM pedido p INNER JOIN cliente c ON p.ID_Cliente = c.ID_Cliente INNER JOIN usuario u ON c.ID_Usuario = u.idUsuario WHERE p.ID_Cliente = ? AND p.ID_Pedido=?;";

        db.query(selectSql, [cliente, pedido], async (selectError, result) => {
            if (selectError) {
                return res.status(500).json({ Error: "Server query error" });
            }

            if (result.length > 0) {
                const correo = result[0].correo;
                const fecha = result[0].Fecha_Entrega
                const direccion= result[0].Direccion_Entrega
                const municipio = result[0].Municipio
                const barrio = result[0].Barrio

                const sql3 = "SELECT p.ID_PedidoAnch, a.NombreAncheta, p.Cantidad, p.Precio * p.Cantidad AS Total FROM pedido_ancheta p INNER JOIN ancheta a ON p.ID_Ancheta = a.ID_Ancheta INNER JOIN pedido Pe ON p.ID_Pedido = Pe.ID_Pedido WHERE p.ID_Pedido = ?"
                db.query(sql3, [pedido], async (error, resultado) => {
                    if (error) {

                        res.status(500).json({ Error: "server query error" })
                    }
                    
                    const formatDate = (dateString) => {
                        const options = { year: 'numeric', month: 'long', day: 'numeric' };
                        const date = new Date(dateString);
                        return date.toLocaleDateString(undefined, options);
                    };
                    const productos = resultado.map((producto) => {
                        return `
                        <tr>
                        <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                            ${producto.NombreAncheta}
                        </td>
                        <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">
                            ${producto.Total}
                        </td>
                    </tr>
                        `;
                    });
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true,
                        auth: {
                            user: 'salgadojuam4@gmail.com',
                            pass: 'vbhfxllcuvnmkcfq'
                        },
                    });

                    let info = await transporter.sendMail({
                        from: '"Recibo de compra" <salgadojuam4@gmail.com>', // sender address
                        to: correo, // list of receivers
                        subject: "Recibo de compra", // Subject line
                        text: "Pedido Aceptado", // plain text body
                        html: `<!DOCTYPE html>
                        <html>
                        
                        <head>
                            <title></title>
                            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                            <style type="text/css">
                                /* CLIENT-SPECIFIC STYLES */
                                body,
                                table,
                                td,
                                a {
                                    -webkit-text-size-adjust: 100%;
                                    -ms-text-size-adjust: 100%;
                                }
                        
                                table,
                                td {
                                    mso-table-lspace: 0pt;
                                    mso-table-rspace: 0pt;
                                }
                        
                                img {
                                    -ms-interpolation-mode: bicubic;
                                }
                        
                                /* RESET STYLES */
                                img {
                                    border: 0;
                                    height: auto;
                                    line-height: 100%;
                                    outline: none;
                                    text-decoration: none;
                                }
                        
                                table {
                                    border-collapse: collapse !important;
                                }
                        
                                body {
                                    height: 100% !important;
                                    margin: 0 !important;
                                    padding: 0 !important;
                                    width: 100% !important;
                                }
                        
                                /* iOS BLUE LINKS */
                                a[x-apple-data-detectors] {
                                    color: inherit !important;
                                    text-decoration: none !important;
                                    font-size: inherit !important;
                                    font-family: inherit !important;
                                    font-weight: inherit !important;
                                    line-height: inherit !important;
                                }
                        
                                /* MEDIA QUERIES */
                                @media screen and (max-width: 480px) {
                                    .mobile-hide {
                                        display: none !important;
                                    }
                        
                                    .mobile-center {
                                        text-align: center !important;
                                    }
                                }
                        
                                /* ANDROID CENTER FIX */
                                div[style*="margin: 16px 0;"] {
                                    margin: 0 !important;
                                }
                            </style>
                        </head>
                        
                        <body style="margin: 0 !important; padding: 0 !important; background-color: #eeeeee;" bgcolor="#eeeeee">
                        
                            <!-- HIDDEN PREHEADER TEXT -->
                            <div
                                style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
                                Tu pedido fue aceptado correctamente y será despachado en la fecha que nos asignaste.
                            </div>
                        
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee">
                                        <!--[if (gte mso 9)|(IE)]>
                                                        <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                        <tr>
                                                        <td align="center" valign="top" width="600">
                                                        <![endif]-->
                                        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                            <tr>
                                                <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#C464D3">
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                <tr>
                                                                <td align="left" valign="top" width="300">
                                                                <![endif]-->
                                                    <div
                                                        style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                            style="max-width:300px;">
                                                            <tr>
                                                                <td align="left" valign="top"
                                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;"
                                                                    class="mobile-center">
                                                                    <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">
                                                                        AMJOR</h1>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                </td>
                                                                <td align="right" width="300">
                                                                <![endif]-->
                                                    <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"
                                                        class="mobile-hide">
                                                        <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                            style="max-width:300px;">
                                                            <tr>
                                                                <td align="right" valign="top"
                                                                    style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;">
                                                                    <table cellspacing="0" cellpadding="0" border="0" align="right">
                                                                        <tr>
                                                                            <td
                                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;">
                                                                                <p
                                                                                    style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;">
                                                                                    <a href="http://litmus.com" target="_blank"
                                                                                        style="color: #ffffff; text-decoration: none;">Shop
                                                                                        &nbsp;</a>
                                                                                </p>
                                                                            </td>
                                                                            <td
                                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;">
                                                                                <a href="http://litmus.com" target="_blank"
                                                                                    style="color: #ffffff; text-decoration: none;"><img
                                                                                        src="shop.png" width="27" height="23"
                                                                                        style="display: block; border: 0px;" /></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                </td>
                                                                </tr>
                                                                </table>
                                                                <![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;"
                                                    bgcolor="#ffffff">
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                <tr>
                                                                <td align="center" valign="top" width="600">
                                                                <![endif]-->
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="max-width:600px;">
                                                        <tr>
                                                            <td align="center"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                                                                <img src="https://www.amjor.shop/static/media/logomoradoclaro.2eee5fa1d47c2715ea07.png"
                                                                    width="125" height="120"
                                                                    style="display: block; border: 0px; border-radius: 50%;" /><br>
                                                                <h2
                                                                    style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;">
                                                                    ¡Gracias por tu compra!
                                                                </h2>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;">
                                                                <p
                                                                    style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;">
                                                                    Tu pedido fue aceptado correctamente y será despachado en la fecha que nos
                                                                    asignaste.
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" style="padding-top: 20px;">
                                                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                    <tr>
                                                                        <td width="75%" align="left" bgcolor="#eeeeee"
                                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                                            Pedido #
                                                                        </td>
                                                                        <td width="25%" align="left" bgcolor="#eeeeee"
                                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">
                                                                            ${pedido}
                                                                        </td>
                                                                    </tr>
                                                                    ${productos.join("")}
                                                                </table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left" style="padding-top: 20px;">
                                                                <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                    <tr>
                                                                        <td width="75%" align="left"
                                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                            TOTAL
                                                                        </td>
                                                                        <td width="25%" align="left"
                                                                            style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">
                                                                            $115.00
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                </td>
                                                                </tr>
                                                                </table>
                                                                <![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" height="100%" valign="top" width="100%"
                                                    style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                <tr>
                                                                <td align="center" valign="top" width="600">
                                                                <![endif]-->
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="max-width:660px;">
                                                        <tr>
                                                            <td align="center" valign="top" style="font-size:0;">
                                                                <!--[if (gte mso 9)|(IE)]>
                                                                            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                            <tr>
                                                                            <td align="left" valign="top" width="300">
                                                                            <![endif]-->
                                                                <div
                                                                    style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                        
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                                        style="max-width:300px;">
                                                                        <tr>
                                                                            <td align="left" valign="top"
                                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                                                <p style="font-weight: 800;">Dirección de destino</p>
                                                                                <p>
                                                                                ${direccion} 
                                                                                <br/>
                                                                                ${barrio} - ${municipio}
                                                                                </p>
                        
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                                <!--[if (gte mso 9)|(IE)]>
                                                                            </td>
                                                                            <td align="left" valign="top" width="300">
                                                                            <![endif]-->
                                                                <div
                                                                    style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;">
                                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                                        style="max-width:300px;">
                                                                        <tr>
                                                                            <td align="left" valign="top"
                                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;">
                                                                                <p style="font-weight: 800;">Fecha de entrega</p>
                                                                                <p>${formatDate(fecha)}</p>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                                <!--[if (gte mso 9)|(IE)]>
                                                                            </td>
                                                                            </tr>
                                                                            </table>
                                                                            <![endif]-->
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                </td>
                                                                </tr>
                                                                </table>
                                                                <![endif]-->
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                                                                <tr>
                                                                <td align="center" valign="top" width="600">
                                                                <![endif]-->
                                                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="max-width:600px;">
                                                        <tr>
                                                            <td align="center">
                                                                <img src="logo-footer.png" width="37" height="37"
                                                                    style="display: block; border: 0px;" />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="center"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                                                                <p
                                                                    style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">
                                                                    Amjor Copyright ©. Todos los derechos reservados
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="left"
                                                                style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;">
                                                                <p
                                                                    style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;">
                                                                    Este correo tiene información importante de tu compra por lo que
                                                                    recomendamos que no lo borres. Si tiene alguna duda comunícate con nosotros
                                                                    a la línea de servicio al cliente 01 8000 42 22 22 para ayudarte lo antes
                                                                    posible..
                                                                </p>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--[if (gte mso 9)|(IE)]>
                                                                </td>
                                                                </tr>
                                                                </table>
                                                                <![endif]-->
                                                </td>
                                            </tr>
                                        </table>
                                        <!--[if (gte mso 9)|(IE)]>
                                                        </td>
                                                        </tr>
                                                        </table>
                                                        <![endif]-->
                                    </td>
                                </tr>
                            </table>
                        </body>
                        
                        </html>`, // html body
                    });
                })

                return res.status(200).json({ Success: true });
            } else {
                return res.status(200).json({ Success: false });
            }
        });
    });
};

module.exports = { aceptar };
