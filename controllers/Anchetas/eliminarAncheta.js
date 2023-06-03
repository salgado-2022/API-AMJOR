const db = require("../../database/db");
const fs = require("fs");

const eliminarAncheta = (req, res) => {
  const id = req.params.id;
  const obtenerRutaImagenSQL = "SELECT image FROM ancheta WHERE ID_Ancheta = ?";
  db.query(obtenerRutaImagenSQL, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error en el servidor" });
    }

    const rutaImagen = result[0].image;

    const eliminarAnchetaSQL = "DELETE FROM ancheta WHERE ID_Ancheta = ?";
    db.query(eliminarAnchetaSQL, [id], (err, result) => {
      if (err) {
        return res.json({ Message: "Error en el servidor" });
      }
      
      fs.unlink(`public/anchetas/${rutaImagen}`, (err) => {
        if (err) {
            return res.json({ Message: "Error al eliminar la imagen" });
        }
      });

      return res.json(result);
    });
  });
};

module.exports = { eliminarAncheta };
