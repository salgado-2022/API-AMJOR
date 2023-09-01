const db = require("../../database/db");

const listarEdRol = (req, res) => {
  const idRol = req.params.id;

  const sql = `
    SELECT r.*, p.ID_Permiso, p.NombrePermiso /* Otros campos del permiso... */
    FROM rol r
    LEFT JOIN permiso_x_rol pxr ON r.ID_Rol = pxr.ID_Rol
    LEFT JOIN permiso p ON pxr.ID_Permiso = p.ID_Permiso
    WHERE r.ID_Rol = ?;
  `;

  db.query(sql, [idRol], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    if (result.length === 0) {
      return res.status(404).json({ Message: "Rol no encontrado" });
    }

    const rolData = {
      ID_Rol: result[0].ID_Rol,
      Nombre_Rol: result[0].Nombre_Rol,
      estado: result[0].estado,
      permisos: result
        .filter(row => row.ID_Permiso !== null)
        .map(row => ({
          ID_Permiso: row.ID_Permiso,
          NombrePermiso: row.NombrePermiso, /* Otros campos del permiso... */
        })),
      // Otros campos del rol...
    };

    return res.json(rolData);
  });
};

const editarRol = (req, res) => {
  const idRol = req.params.id;
  const { Nombre_Rol, estado, Permisos } = req.body;

  const sqlUpdateRol = "UPDATE rol SET Nombre_Rol = ?, estado = ? WHERE ID_Rol = ?";
  const sqlDeletePermisos = "DELETE FROM permiso_x_rol WHERE ID_Rol = ?";
  const sqlInsertPermisos = "INSERT INTO permiso_x_rol (ID_Rol, ID_Permiso) VALUES ?";

  db.query(sqlUpdateRol, [Nombre_Rol, estado, idRol], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ Message: "Rol no encontrado" });
    }

    db.query(sqlDeletePermisos, [idRol], (err, deleteResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Message: "Error en el servidor" });
      }

      const valuesToInsert = Permisos.map(ID_Permiso => [idRol, ID_Permiso]);
      db.query(sqlInsertPermisos, [valuesToInsert], (err, insertResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ Message: "Error en el servidor" });
        }

        return res.json({ Message: "Rol actualizado correctamente" });
      });
    });
  });
};

module.exports = { listarEdRol, editarRol };
