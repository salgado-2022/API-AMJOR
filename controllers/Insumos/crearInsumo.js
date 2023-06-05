const db = require("../../database/db");

const postInsumo = (req , res) =>{

    const sql ="INSERT INTO insumo (`NombreInsumo`,`Descripcion`,`PrecioUnitario`) VALUES (?)";

    const values =[
        req.body.NombreInsumo,
        req.body.Descripcion,
        req.body.PrecioUnitario
    ]
    db.query(sql, [values] , (err, result ) => {
        if(err) return res.json({Error: " Inserting data error in server "});
        return res.json({Status: "Success"});

    })

}

module.exports = {postInsumo}