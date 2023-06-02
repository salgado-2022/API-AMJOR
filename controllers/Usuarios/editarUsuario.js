const db = require("../../database/db");


const listarEdUsuarios = (req, res) => {

    const sql = "SELECT * FROM usuario WHERE ID_Usuario = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

const editarUsuario = (req, res) => {
    const sql = "UPDATE usuarios SET `correo`=?, `contrasena`=?, `ID_Rol`=? WHERE ID_Usuario=?";
    const id = req.params.id;
    db.query(sql,[req.body.correo, req.body.contrasena, req.body.ID_Rol, id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

module.exports ={listarEdUsuarios, editarUsuario}