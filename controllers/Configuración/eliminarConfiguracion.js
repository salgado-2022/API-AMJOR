const db = require("../../database/db");

const eliminarRol = (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ error: "ID de rol no proporcionado" });
  }

  const sql = "DELETE FROM rol WHERE ID_Rol = ?";
  
  try {
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error en el servidor al eliminar el rol" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No se encontró el rol a eliminar" });
      }

      return res.json({ message: "Rol eliminado exitosamente" });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor al procesar la solicitud" });
  }
};

module.exports = { eliminarRol };
