const db = require("../../database/db");


const listarPedidos = (io) => {

    io.on('connection', socket => {


        socket.on('solicitarPedidos', () => {
            const query = "SELECT P.ID_Pedido, C.ID_Cliente,C.Nombre AS Nombre_Cliente, C.Telefono, P.Direccion_Entrega, P.Municipio,P.Barrio, P.Fecha_Entrega, P.Precio_Total, U.correo, P.Estado, P.fecha_creacion, P.Status_Pedido FROM pedido P JOIN cliente C ON P.ID_Cliente = C.ID_Cliente JOIN usuario U ON C.ID_Usuario = U.idUsuario WHERE P.Status_Pedido < 3";
            db.query(query, (err, result) => {
                if (err) {
                    console.error("Error en la consulta:", err);
                    return;
                }
                socket.emit("Pedidos", result); // Enviar los resultados al cliente
            });
            socket.on('disconnect', () => {
            });
        });
    });

};

module.exports = {
    listarPedidos
};
