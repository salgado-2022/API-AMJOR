const db = require("../../database/db");

const enviarPedido = (req, res) => {
    const { 
        ID_Cliente,
        Pais, 
        Municipio,
        Barrio,
        Direccion_Entrega, 
        Fecha_Entrega, 
        Notas_Adicionales,
        Precio_Total, 
        Anchetas } = req.body;

    // Insertar el pedido en la tabla `pedido`
    
    const insertPedidoQuery = "INSERT INTO `pedido` (`ID_Cliente`, `Pais`, `Municipio`, `Barrio`, `Direccion_Entrega`, `Fecha_Entrega`, `Notas_Adicionales`, `Precio_Total`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const pedidoValues = [ID_Cliente, Pais, Municipio, Barrio, Direccion_Entrega, Fecha_Entrega, Notas_Adicionales, Precio_Total];

    db.query(insertPedidoQuery, pedidoValues, (err, result) => {
        if (err) return res.json({ Error: "Error al crear el pedido en el servidor: " + err });

        const pedidoID = result.insertId;

        // Recorrer las anchetas y guardar los detalles en la base de datos
        Anchetas.forEach((ancheta) => {
            const { ID_Ancheta, Cantidad, Insumos, PrecioUnitario } = ancheta;

            // Insertar detalles de la ancheta en la tabla `pedido_ancheta`
            const insertPedidoAnchetaQuery = "INSERT INTO pedido_ancheta (ID_Pedido, ID_Ancheta, Cantidad, Precio) VALUES (?, ?, ?, ?)";
            //const precio = PrecioUnitario
            const pedidoAnchetaValues = [pedidoID, ID_Ancheta, Cantidad, PrecioUnitario];

            db.query(insertPedidoAnchetaQuery, pedidoAnchetaValues, (err, resultado) => {

                const ID_PedidoAnch = resultado.insertId

                if (err) console.error("Error al insertar detalle de pedido_ancheta:", err);

                // Insertar detalles de insumos en la tabla `pedido_insumos_ancheta`
                Insumos.forEach((insumo) => {
                    const { ID_Insumo, Cantidad: InsumoCantidad, Precio} = insumo;
                    const insertPedidoInsumoQuery = "INSERT INTO pedido_insumos_ancheta (ID_PedidoAnch, ID_Insumo, Cantidad, Precio) VALUES (?, ?, ?, ?)";
                    //const precio = 2000
                    const pedidoInsumoValues = [ID_PedidoAnch, ID_Insumo, InsumoCantidad, Precio];

                    db.query(insertPedidoInsumoQuery, pedidoInsumoValues, (err) => {
                        if (err) console.error("Error al insertar detalle de pedido_insumos_ancheta:", err);
                    });
                });
            });

        });

        return res.json({ Status: "Pedido creado y enviado exitosamente.", pedidoID: pedidoID });
    });
};

module.exports = { enviarPedido };
