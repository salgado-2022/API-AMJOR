const db = require("../../database/db");


const buscarPedidosPendientes = (req, res) => {

    const sql = "SELECT COUNT(*) AS total_pedidos_pendientes FROM pedido WHERE Estado = 3;"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor ", err});
        return res.json(result);
    })

}

module.exports ={buscarPedidosPendientes}