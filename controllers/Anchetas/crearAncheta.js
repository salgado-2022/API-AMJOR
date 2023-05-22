const db = require("../../database/db");

const postAncheta = (req , res) =>{

    const sql ="INSERT INTO ancheta (`NombreAncheta`,`Descripcion`,`PrecioUnitario`,`ID_Estado`) VALUES (?)";

    const values =[
        req.body.NombreAncheta,
        req.body.Descripcion,
        req.body.PrecioUnitario,
        req.body.ID_Estado
    ]
    db.query(sql, [values] , (err, result ) => {
        if(err) return res.json({Error: " Inserting data error in server "});
        return res.json({Status: "Success"});

    })

}

module.exports = {postAncheta}