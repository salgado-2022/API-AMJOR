const db = require("../../database/db");


const eliminarInsumo = ( '/delete/:id', (req, res) => {

    const sql = "DELETE FROM insumo WHERE ID_Insumo =?";
    const id = req.params.id;
    db.query(sql, [id], (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })
})

module.exports ={eliminarInsumo}