const db = require("../../database/db");

const eliminarUsuario = ( '/delete/:id', (req, res) =>{
  const sql = "DELETE FROM usuario WHERE idUsuario = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error en el servidor" });
    }

    return res.json(result);
  });
});

module.exports = { eliminarUsuario };