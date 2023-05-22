const db = require("../../database/db");


const listarEdAncheta = (req, res) => {

    const sql = "SELECT * FROM ancheta WHERE ID_Ancheta = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

const editarAncheta = (req, res) => {
    const sql = "UPDATE ancheta SET `NombreAncheta`=?, `Descripcion`=?, `PrecioUnitario`=?, `ID_Estado`=? WHERE ID_Ancheta=?";
    const id = req.params.id;
    db.query(sql,[req.body.NombreAncheta, req.body.Descripcion, req.body.PrecioUnitario, req.body.ID_Estado, id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

module.exports ={listarEdAncheta, editarAncheta}