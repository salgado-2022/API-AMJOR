const db = require("../../database/db");

const listarUsuario = (req, res) => {
  const sql = `
    SELECT U.idUsuario, U.correo, U.Estado, R.Nombre_Rol
    FROM usuario U
    LEFT JOIN rol R ON U.ID_Rol = R.ID_Rol
    WHERE U.Estado = 1
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error en el servidor" });
    }

    return res.json(result);
  });
};

module.exports = { listarUsuario };
