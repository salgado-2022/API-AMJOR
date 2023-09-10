const db = require("../../database/db");


const MasVendidas = (req, res) =>{

    sql = "SELECT an.ID_Ancheta,an.NombreAncheta, COUNT(*) AS Cantidad_Vendida FROM pedido p INNER JOIN pedido_ancheta a ON a.ID_Pedido = p.ID_Pedido INNER JOIN ancheta an ON a.ID_Ancheta = an.ID_Ancheta WHERE p.Status_Pedido = 3 GROUP BY an.ID_Ancheta ORDER BY `Cantidad_Vendida` DESC"

    db.query(sql, (err, result)=>{
        if (err) return res.json({ Message: "Error en el servidor ", err });
        return res.status(200).json(result);

    })

}

module.exports={MasVendidas}