const db = require("../../database/db");
const upload = require("../../models/multerConfig")

const postAncheta = (upload.single('image'), (req, res) => {
    const sql = "INSERT INTO ancheta (`NombreAncheta`,`Descripcion`,`PrecioUnitario`,`image`) VALUES (?)";
    const values = [
        req.body.NombreAncheta,
        req.body.Descripcion,
        req.body.PrecioUnitario,
        req.file.filename
    ];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error inserting formdata" });
        }

        const idAncheta = result.insertId;

        const sql2 = "INSERT INTO insumos_ancheta (`ID_Ancheta`, `ID_Insumo`, `Cantidad`, `Precio`) VALUES (?,?,?,?)";
        const insumos = JSON.parse(req.body.Insumos);

        // Recorrer los insumos y ejecutar la inserción para cada uno
        insumos.forEach((insumo) => {
            const insumoValues = [
                idAncheta,
                insumo.idInsumo,
                insumo.cantidad,
                insumo.precio
            ];
            db.query(sql2, insumoValues, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.json({ Error: "Error inserting insumos" });
                }
            });
        });

        return res.json({ Status: "Success" });
    });
});

module.exports = { postAncheta }
