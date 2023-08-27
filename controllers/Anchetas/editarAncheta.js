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
  db.query(updateAnchetaSQL, [NombreAncheta, Descripcion, PrecioUnitario, ID_Estado, id], (err, result) => {
    if (err) {
      return res.json({ Message: 'Error en el servidor' });
    }
    const insumos = JSON.parse(req.body.Insumos);

    const selectAllInsumosSQL = 'SELECT * FROM insumos_ancheta WHERE ID_Ancheta = ?';

    db.query(selectAllInsumosSQL, [id], (err, insumosResult) => {
      if (err) {
        return res.json({ Error: "Error al obtener los insumos" });
      }
  
      insumosResult.forEach((insumoTabla) => {
        const insumoEncontrado = insumos.find((insumo) => insumo.idInsumo === insumoTabla.ID_Insumo);
        
        if (!insumoEncontrado) {
          // Si el insumo de la tabla no se encuentra en la lista de insumos, eliminelo.
          const deleteInsumoSQL = 'DELETE FROM insumos_ancheta WHERE ID_Ancheta = ? AND ID_Insumo = ?';
          db.query(deleteInsumoSQL, [id, insumoTabla.ID_Insumo], (err, deleteResult) => {
            if (err) {
              console.log('Error al eliminar insumo:', err);
            }
          });
        }
      });
    });

    insumos.forEach((insumo) => {
      const insumoUpdate = [
        insumo.cantidad,
        insumo.precio,
        insumo.idInsumo
      ];

      const insumoAdd = [
        id,
        insumo.idInsumo,
        insumo.cantidad,
        insumo.precio
      ];

      const selectInsumoSQL = 'SELECT ID_Insumo FROM insumos_ancheta WHERE ID_Ancheta = ? AND ID_Insumo = ?';
      const updateInsumoSQL = 'UPDATE insumos_ancheta SET `Cantidad`=?, `Precio`=? WHERE ID_Insumo=?';
      const insertInsumoSQL = 'INSERT INTO insumos_ancheta (`ID_Ancheta`, `ID_Insumo`, `Cantidad`, `Precio`) VALUES (?,?,?,?)';

      db.query(selectInsumoSQL, [id, insumo.idInsumo], (err, selectResult) => {
        if (err) {
          return res.json({ Error: "Error al verificar el insumo" });
        }
        if (selectResult.length === 0) {
          // Si el insumo no es encontrado, haga una inserción.
          db.query(insertInsumoSQL, insumoAdd, (err, insertResult) => {
            if (err) {
              return res.json({ Error: "Error al insertar insumo" });
            }
          });
        } else {
          // Si no, actualice el insumo que encontró.
          db.query(updateInsumoSQL, insumoUpdate, (err, updateResult) => {
            if (err) {
              return res.json({ Error: "Error al actualizar insumo" });
            }
          });
        }
      });
    }
  )
  return res.json({ Status: "Success" });
  });

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
