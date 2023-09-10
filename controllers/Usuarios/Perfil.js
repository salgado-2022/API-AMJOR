const fs = require('fs');
const db = require("../../database/db");


const ConsultarInfoUser = (req, res) => {

    const id = req.params.id;
    const sql = "SELECT c.Documento, c.Nombre, c.Apellido, c.Telefono, u.correo, c.img from cliente c INNER JOIN usuario u ON c.ID_Usuario = u.idUsuario WHERE u.idUsuario = ?"

    db.query(sql, [id], (err, result)=>{
        if(err) return res.status(500).json({Message: 'Error en el servidor'});
        return res.status(200).json(result);
    })
}



module.exports = {
    ConsultarInfoUser
}