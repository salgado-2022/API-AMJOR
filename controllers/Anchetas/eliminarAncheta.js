const db = require("../../database/db");
const fs = require("fs");

const eliminarAncheta = (req, res) => {
  const id = req.params.id;
  
  // Obtén la ruta de la imagen almacenada en la base de datos
  const obtenerRutaImagenSQL = "SELECT image FROM ancheta WHERE ID_Ancheta = ?";
  db.query(obtenerRutaImagenSQL, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error en el servidor" });
    }

    const rutaImagen = result[0].image; // Asegúrate de que la columna de la imagen se llame 'image' en tu tabla

    // Elimina la ancheta de la base de datos
    const eliminarAnchetaSQL = "DELETE FROM ancheta WHERE ID_Ancheta = ?";
    db.query(eliminarAnchetaSQL, [id], (err, result) => {
      if (err) {
        return res.json({ Message: "Error en el servidor" });
      }
      
      // Elimina el archivo de imagen localmente
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
