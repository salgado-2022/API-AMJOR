const db = require("../../database/db");

const eliminarInsumo = (req, res) => {
    const id = req.params.id;

    const checkExistenceSQL = "SELECT * FROM insumos_ancheta WHERE ID_Insumo = ?";
    db.query(checkExistenceSQL, [id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error en el servidor" });
        }

        if (result.length > 0) {
            return res.json({ Message: "Error" });
        } else {
            const deleteSQL = "DELETE FROM insumo WHERE ID_Insumo = ?";
            db.query(deleteSQL, [id], (err, result) => {
                if (err) {
                    return res.json({ Message: "Error en el servidor" });
                }
                return res.json({ Message: "El idInsumo ha sido eliminado correctamente." });
            });
        }
    });
};

module.exports = { eliminarInsumo };
