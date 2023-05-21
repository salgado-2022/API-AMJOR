const db = require("../../database/db");


const listarEdInsumo = (req, res) => {

    const sql = "SELECT * FROM insumo WHERE ID_Insumo = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

const editarInsumo = (req, res) => {
    const sql = "UPDATE insumo SET `NombreInsumo`=?, `Descripcion`=?, `PrecioUnitario`=?, `ID_Estado`=? WHERE ID_Insumo=?";
    const id = req.params.id;
    db.query(sql,[req.body.NombreInsumo, req.body.Descripcion, req.body.PrecioUnitario, req.body.ID_Estado, id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
}

module.exports ={listarEdInsumo, editarInsumo}