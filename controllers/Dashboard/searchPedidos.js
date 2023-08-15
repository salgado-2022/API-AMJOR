const db = require("../../database/db");


const buscarCantidadPedidos = (req, res) => {

    const sql = "SELECT COUNT(*) AS total_pedidos FROM pedido;"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor ", err});
        return res.json(result);
    })

}

module.exports ={buscarCantidadPedidos}