const db = require("../../database/db");


const listarEdInsumo = (req, res) => {

    const sql = "SELECT * FROM insumo WHERE ID_Insumo = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

module.exports ={listarEdInsumo}