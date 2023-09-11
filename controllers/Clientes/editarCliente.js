const db = require('../../database/db');
const bcrypt = require('bcrypt');

// Función para editar un cliente por su ID
const editarCliente = (req, res) => {
  const { id } = req.params;
  const { documento, nombre, apellido, telefono, estado } = req.body;

  // Crea la consulta SQL para actualizar el cliente
  const sql = `
    UPDATE cliente
    SET Documento = ?, Nombre = ?, Apellido = ?, Telefono = ?
    WHERE ID_Cliente = ?;
  `;

  const values = [documento, nombre, apellido, telefono, id];

  // Ejecuta la consulta SQL para actualizar el cliente
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: 'Error en el servidor' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ Message: 'Cliente no encontrado' });
    }

    // Luego, crea la consulta SQL para actualizar el usuario (estado)
    const usuarioSql = `
      UPDATE usuario
      SET Estado = ?
      WHERE idUsuario = ?;
    `;

    const usuarioValues = [estado, id];

    // Ejecuta la consulta SQL para actualizar el usuario
    db.query(usuarioSql, usuarioValues, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Message: 'Error en el servidor' });
      }

      return res.json({ Message: 'Cliente y usuario actualizados exitosamente' });
    });
  });
};

module.exports = { editarCliente };
