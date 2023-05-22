const db = require("../../database/db");


const listarAncheta = (req, res) => {

    const sql = "SELECT P.ID_Ancheta, P.NombreAncheta, P.Descripcion, P.PrecioUnitario, C.NombreEstado AS Estado FROM ancheta P JOIN estado C ON P.ID_Estado = C.ID_Estado ORDER BY Estado DESC"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })

}

module.exports ={listarAncheta}