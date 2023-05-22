const db = require("../../database/db");


const DetalleAncheta = (req, res) => {

    const sql = "SELECT p.ID_PedidoInsumo, i.NombreInsumo,p.Cantidad,p.Precio FROM pedido_insumos_ancheta p INNER JOIN insumo i on p.ID_Insumo = i.ID_Insumo WHERE ID_PedidoAnch = ?;"
    const id = req.params.id;

    db.query(sql,[id], (err, result)=>{
        if(err) return res.status(500).json({Message: "Error en el servidor "});
        return res.status(200).json(result);
    })

}

module.exports ={DetalleAncheta}