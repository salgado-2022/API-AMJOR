const db = require("../../database/db");

const listarEdUsuarios = (req, res) => {
  const sql = "SELECT * FROM usuario WHERE ID_Usuario = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, result) => {
    if (err) return res.json({ Message: "Error en el servidor" });
    return res.json(result);
  });
};

const editarUsuario = (req, res) => {
  const sql = "UPDATE usuario SET `correo`=?, `contrasena`=? WHERE ID_Usuario=?";
  const id = req.params.id;
  db.query(sql,[req.body.correo, req.body.contrasena, id],(err, result) => {
      if (err) return res.json({ Message: "Error en el servidor" });
      return res.json(result);
    }
  );
};

module.exports = { listarEdUsuarios, editarUsuario };
