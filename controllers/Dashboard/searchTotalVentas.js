const db = require("../../database/db");


const buscarTotalVentas = (req, res) => {

    const sql = "SELECT SUM(Precio_Total) AS suma_precios_ventas FROM pedido WHERE Estado = 4;"
    db.query(sql, (err, result)=>{
        if(err) return res.json({Message: "Error en el servidor ", err});
        return res.json(result);
    })

}

module.exports ={buscarTotalVentas}