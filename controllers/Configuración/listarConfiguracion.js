const db = require("../../database/db");

const listarConfiguracion = (req, res) => {
  // Consulta SQL para obtener todos los roles ordenados por ID
  const sql = `
    SELECT R.ID_Rol, R.Nombre_Rol, R.estado
    FROM rol R
    ORDER BY R.ID_Rol ASC
  `;

  // Ejecuta la consulta en la base de datos
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    // Devuelve los resultados como respuesta JSON
    return res.json(result);
  });
};

module.exports = { listarConfiguracion };
