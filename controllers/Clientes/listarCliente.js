const db = require("../../database/db");

const listarCliente = (req, res) => {
  const sql = `
    SELECT U.idUsuario, C.ID_Cliente, U.correo, ID_Rol, C.Documento, C.Nombre, C.Apellido, C.Telefono, U.Estado, C.img AS foto
    FROM usuario U
    JOIN cliente C ON U.idUsuario = C.ID_Usuario 
    WHERE U.ID_Rol = 2
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

module.exports = { listarCliente };
