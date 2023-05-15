const db = require("../../database/db");


const listarPedidos = (req, res) => {

    const sql = "SELECT * FROM usuario"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })

}

module.exports ={listarPedidos}