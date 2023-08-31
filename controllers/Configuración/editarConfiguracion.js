const db = require("../../database/db");

const listarEdRol = (req, res) => {
  const idRol = req.params.id;

  const sql = `
    SELECT r.*, pxr.ID_Rol_Permiso, pxr.ID_Permiso
    FROM rol r
    LEFT JOIN permiso_x_rol pxr ON r.ID_Rol = pxr.ID_Rol
    WHERE r.ID_Rol = ?;
  `;

  db.query(sql, [idRol], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    // Organizar los datos para enviarlos en la respuesta
    const rolData = {
      ID_Rol: result[0].ID_Rol,
      Nombre_Rol: result[0].Nombre_Rol,
      // Otros campos del rol...
    };

    const permisos = result
      .filter(row => row.ID_Rol_Permiso !== null) // Filtrar solo los permisos asociados
      .map(row => ({
        ID_Permiso: row.ID_Permiso,
        // Otros campos del permiso...
      }));

    rolData.permisos = permisos;

    return res.json(rolData);
  });
};

const editarRol = (req, res) => {
  const sql = "UPDATE rol SET Nombre_Rol = ? WHERE ID_Rol = ?";
  const id = req.params.id;
  const { Nombre_Rol } = req.body;

  db.query(sql, [Nombre_Rol, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    return res.json({ Message: "Rol actualizado correctamente" });
  });
};

module.exports = { listarEdRol, editarRol };
