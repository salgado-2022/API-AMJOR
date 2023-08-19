const db = require("../../database/db");


const DetallePedido = (req, res) => {

    const sql = "SELECT p.ID_PedidoAnch, a.NombreAncheta, p.Cantidad, p.Precio * p.Cantidad AS Total, a.image FROM pedido_ancheta p INNER JOIN ancheta a ON p.ID_Ancheta = a.ID_Ancheta WHERE p.ID_Pedido = ?;"
    const id = req.params.id;

    db.query(sql,[id], (err, result)=>{
        if(err) return res.status(500).json({Message: "Error en el servidor "});
        return res.status(200).json(result);
    })

}

module.exports ={DetallePedido}