const db = require("../../database/db");

const eliminarRol = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID de rol no proporcionado" });
  }

  // Verifica si el rol se está utilizando en la tabla "usuario"
  const verificarUsoEnUsuariosSQL = "SELECT COUNT(*) as count FROM usuario WHERE ID_Rol = ?";
  
  db.query(verificarUsoEnUsuariosSQL, [id], (err, countResult) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Error en el servidor al verificar el uso del rol" });
    }

    const usuariosEnUso = countResult[0].count;

    // Si hay usuarios que utilizan este rol, muestra un mensaje de alerta y no elimina el rol
    if (usuariosEnUso > 0) {
      return res.status(400).json({ error: "No se puede eliminar el rol. Está en uso por usuarios." });
    }

    // Si no hay usuarios que utilizan este rol, procede con la eliminación
    const eliminarPermisosSQL = "DELETE FROM permiso_x_rol WHERE ID_Rol = ?";
  
    db.query(eliminarPermisosSQL, [id], (err, permisosResult) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error en el servidor al eliminar los permisos" });
      }

      // Luego, elimina el registro en la tabla rol
      const eliminarRolSQL = "DELETE FROM rol WHERE ID_Rol = ?";
    
      db.query(eliminarRolSQL, [id], (err, rolResult) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Error en el servidor al eliminar el rol" });
        }

        if (rolResult.affectedRows === 0) {
          return res.status(404).json({ error: "No se encontró el rol a eliminar" });
        }

        return res.json({ message: "Rol y permisos asociados eliminados exitosamente" });
      });
    });
  });
};

module.exports = { eliminarRol };
