const db = require("../../database/db");

const listarEdRol = (req, res) => {
  const sql = "SELECT * FROM rol WHERE ID_Rol = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }
    return res.json(result);
  });
};

const editarRol = (req, res) => {
  const sql = "UPDATE rol SET Nombre_Rol = ? WHERE ID_Rol = ?";
  const id = req.params.id;
  const { Nombre_Rol } = req.body; // Desestructurar el Nombre_Rol del cuerpo de la solicitud

  db.query(sql, [Nombre_Rol, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    return res.json({ Message: "Rol actualizado correctamente" });
  });
};

module.exports = { listarEdRol, editarRol };
