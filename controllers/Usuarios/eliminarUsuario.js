const db = require("../../database/db");

const eliminarUsuario = (req, res) => {
  const userId = req.params.id;

  // Primero, eliminamos las referencias en la tabla 'cliente'
  const deleteClienteQuery = "DELETE FROM cliente WHERE ID_Usuario = ?";
  db.query(deleteClienteQuery, [userId], (err, clienteResult) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error en el servidor al eliminar cliente" });
    }

    // Luego, eliminamos el usuario de la tabla 'usuario'
    const deleteUserQuery = "DELETE FROM usuario WHERE idUsuario = ?";
    db.query(deleteUserQuery, [userId], (err, userResult) => {
      if (err) {
        console.log(err);
        return res.json({ Message: "Error en el servidor al eliminar usuario" });
      }

      return res.json({ Message: "Usuario eliminado correctamente" });
    });
  });
};

module.exports = { eliminarUsuario };
