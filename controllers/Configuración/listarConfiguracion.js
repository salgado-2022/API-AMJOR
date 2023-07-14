const db = require("../../database/db");

const listarConfiguracion = (req, res) => {
  const sql = "SELECT R.ID_Rol, R.Nombre_Rol FROM rol R ORDER BY R.ID_Rol ASC";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    return res.json(result);
  });
};

module.exports = { listarConfiguracion };
