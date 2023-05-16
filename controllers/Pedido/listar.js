const db = require("../../database/db");


const listarPedidos = (req, res) => {

    const sql = "SELECT P.ID_Pedido, C.Nombre AS Nombre_Cliente, P.Direccion_Entrega, P.Feche_Entrega, P.Precio_Total FROM pedido P JOIN cliente C ON P.ID_Cliente = C.ID_Cliente;"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor "});
        return res.json(result);
    })

}

module.exports ={listarPedidos}