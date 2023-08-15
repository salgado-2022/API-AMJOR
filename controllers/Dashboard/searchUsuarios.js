const db = require("../../database/db");


const buscarCantidadUsuarios = (req, res) => {

    const sql = "SELECT COUNT(*) AS total_usuarios FROM usuario;"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor ", err});
        return res.json(result);
    })

}

module.exports ={buscarCantidadUsuarios}