const fs = require('fs');
const db = require("../../database/db");


const ConsultarInfoUser = (req, res) => {

    const id = req.params.id;
    const sql = "SELECT c.Documento, c.Nombre, c.Apellido, c.Telefono, u.correo, c.img from cliente c INNER JOIN usuario u ON c.ID_Usuario = u.idUsuario WHERE u.idUsuario = ?"
    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ Message: 'Error en el servidor' });
        return res.status(200).json(result);
    })
}


const ActualizarPerfil = (req, res) => {

    const id = req.params.id;
    const { Documento, Nombre, Apellido, Telefono, correo } = req.body;

    const sql = "UPDATE cliente SET Documento= ?, Nombre= ?, Apellido=? ,Telefono=?  WHERE ID_Usuario = ?"

    db.query(sql, [Documento, Nombre, Apellido, Telefono, id], (err, result) => {
        if (err) return res.status(500).json({ Message: 'Error en el servidor' })

        if (correo) {
            const updateCorreo = "UPDATE usuario SET correo=? WHERE idUsuario= ?"
            db.query(updateCorreo, [correo], (error, resultado) => {
                if (error) return res.status(500).json({ Message: 'Error actualizando el correo' })
            })
        }
        return res.json({ Status: "Success" });
    })
    if (req.file) {
        const updateImageSQL = 'UPDATE cliente SET `img`=? WHERE ID_Usuario=?';
        db.query(updateImageSQL, [req.file.filename, id], (err, result) => {
            
            const imagePath = 'public/anchetas/' + req.body.oldImage;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error al eliminar la imagen anterior:', err);
                }
            });
        });
    }
}



module.exports = {
    ConsultarInfoUser,
    ActualizarPerfil
}