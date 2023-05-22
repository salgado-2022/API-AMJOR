const db = require("../../database/db");


const verInsumos = (req, res) => {

    const sql = "SELECT p.ID_Insumos_Ancheta, a.NombreInsumo, p.Cantidad, p.Precio AS Total FROM insumos_ancheta p INNER JOIN insumo a ON p.ID_Insumo = a.ID_Insumo WHERE p.ID_Ancheta = ?;"
    const id = req.params.id;

    db.query(sql,[id], (err, result)=>{
        if(err) return res.status(500).json({Message: "Error en el servidor "});
        return res.status(200).json(result);
    })

}

module.exports ={verInsumos}