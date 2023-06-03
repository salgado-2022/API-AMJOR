const fs = require('fs');
const db = require('../../database/db');

const listarEdAncheta = (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM ancheta WHERE ID_Ancheta = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({ Message: 'Error en el servidor' });
    }
    return res.json(result);
  });
};


const editarAncheta = (req, res) => {
  const id = req.params.id;
  const { NombreAncheta, Descripcion, PrecioUnitario, ID_Estado } = req.body;

  const updateAnchetaSQL = 'UPDATE ancheta SET `NombreAncheta`=?, `Descripcion`=?, `PrecioUnitario`=?, `ID_Estado`=? WHERE ID_Ancheta=?';
  db.query(updateAnchetaSQL, [NombreAncheta, Descripcion, PrecioUnitario, ID_Estado, id],
    (err, result) => {
      if (err) {
        return res.json({ Message: 'Error en el servidor' });
      }
      return res.json(result);
    }
  );

  if (req.file) {
    const updateImageSQL = 'UPDATE ancheta SET `image`=? WHERE ID_Ancheta=?';
    db.query(updateImageSQL, [req.file.filename, id], (err, result) => {
      if (err) {
        return res.json({ Message: 'Error en el servidor' });
      }
      const imagePath = 'public/anchetas/' + req.body.oldImage;
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error al eliminar la imagen anterior:', err);
        }
      });
    });
  }
};

module.exports = { listarEdAncheta, editarAncheta };
