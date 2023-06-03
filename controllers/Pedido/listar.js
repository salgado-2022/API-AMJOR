const db = require("../../database/db");


const listarPedidos = (io) => {

    io.on('connection', socket => {
        const query = "SELECT P.ID_Pedido, c.ID_Cliente,C.Nombre AS Nombre_Cliente, P.Direccion_Entrega, P.Feche_Entrega, P.Precio_Total FROM pedido P JOIN cliente C ON P.ID_Cliente = C.ID_Cliente;";
        const interval = setInterval(() => {
            db.query(query, (err, result) => {
                if (err) {
                    console.error("Error en la consulta:", err);
                    return;
                }
                socket.emit("Pedidos", result);
            });
        }, 500);

        socket.on('disconnect', () => {
            clearInterval(interval);
        });
    });

};

module.exports = {
    listarPedidos
};
