const db = require("../../database/db");
const upload = require("../../models/multerConfig");

const listarEdAncheta = (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM ancheta WHERE ID_Ancheta = ?";
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error en el servidor" });
    }
    return res.json(result);
  });
};

const editarAncheta = (upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { NombreAncheta, Descripcion, PrecioUnitario, ID_Estado } = req.body;
  
  // Consulta para actualizar todos los campos excepto 'image'
  const updateAnchetaSQL = "UPDATE ancheta SET `NombreAncheta`=?, `Descripcion`=?, `PrecioUnitario`=?, `ID_Estado`=? WHERE ID_Ancheta=?";
  db.query(updateAnchetaSQL, [NombreAncheta, Descripcion, PrecioUnitario, ID_Estado, id], (err, result) => {
    if (err) {
      return res.json({ Message: "Error en el servidor" });
    }
    return res.json(result);
  });

  // Consulta para actualizar solo el campo 'image' si se proporciona una nueva imagen
  if (req.file) {
    const updateImageSQL = "UPDATE ancheta SET `image`=? WHERE ID_Ancheta=?";
    db.query(updateImageSQL, [req.file.filename, id], (err, result) => {
      if (err) {
        return res.json({ Message: "Error en el servidor" });
      }
    });
  }
});

module.exports = { listarEdAncheta, editarAncheta };
