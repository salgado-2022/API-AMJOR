const db = require("../../database/db");

const listarPermisos = (req, res) => {
  const sql = "SELECT P.ID_Permiso, P.NombrePermiso FROM permiso P ORDER BY P.ID_Permiso ASC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    return res.json(result);
  });
};

module.exports = { listarPermisos };