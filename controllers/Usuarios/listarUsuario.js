const db = require("../../database/db");

const listarUsuario = (req, res) => {
  // Consulta SQL para obtener todos los usuarios con su rol, incluyendo activos e inactivos
  const sql = `
  SELECT U.idUsuario, U.correo, U.Estado, R.Nombre_Rol, C.ID_Cliente, C.Documento, C.Nombre
  FROM usuario U
  LEFT JOIN rol R ON U.ID_Rol = R.ID_Rol
  LEFT JOIN cliente C ON U.idUsuario = C.ID_Cliente
  ORDER BY U.idUsuario ASC;
  
  
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

module.exports = { listarUsuario };
