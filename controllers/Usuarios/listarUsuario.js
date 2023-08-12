const db = require("../../database/db");

const listarUsuario = (req, res) => {
  const sql = "SELECT U.idUsuario, U.correo , U.Estado FROM usuario U WHERE U.Estado = 1";

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error en el servidor" });
    }

    return res.json(result);
  });
};

module.exports = { listarUsuario };