const db = require("../../database/db");


const eliminarAncheta = ( '/delete/:id', (req, res) => {

    const sql = "DELETE FROM ancheta WHERE ID_Ancheta =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
})

module.exports ={eliminarAncheta}