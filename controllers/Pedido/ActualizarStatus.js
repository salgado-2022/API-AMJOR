const db = require("../../database/db");


const Preparacion = (req, res) => {

    const sql = "UPDATE pedido SET Status_Pedido = 1 WHERE ID_Pedido = ?"
    const id = req.params.idPedido

    db.query(sql, [id], (err, ress) => {

        if (err) return res.status(500).json({ Error: "Server query error" })

        return res.status(200).json(ress)
    })


}


const Preparado = (req, res) => {

    const sql = "UPDATE pedido SET Status_Pedido = 2 WHERE ID_Pedido = ?"
    const id = req.params.idPedido

    db.query(sql, [id], (err, ress) => {

        if (err) return res.status(500).json({ Error: "Server query error" })

        return res.status(200).json(ress)
    })
}


const Despachado = (req, res) => {
    const sql = "UPDATE pedido SET Status_Pedido = 3 WHERE ID_Pedido = ?"
    const id = req.params.idPedido

    db.query(sql, [id], (err, ress) => {

        if (err) return res.status(500).json({ Error: "Server query error" })

        return res.status(200).json(ress)
    })
}
module.exports = { Preparacion, Preparado, Despachado }