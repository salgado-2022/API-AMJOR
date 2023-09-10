const db = require("../../database/db");


const VentasGrafica = (req, res) => {
    const sql = "SELECT YEAR(Fecha_Entrega) AS Anio, MONTH(Fecha_Entrega) AS Mes, MIN(DAY(Fecha_Entrega)) AS Dia, COUNT(*) AS Cantidad_Ventas FROM pedido WHERE Status_Pedido = 3 GROUP BY YEAR(Fecha_Entrega), MONTH(Fecha_Entrega) ORDER BY Anio, Mes"
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Error en el servidor ", err });
        return res.json(result);
    })
}

module.exports ={VentasGrafica}