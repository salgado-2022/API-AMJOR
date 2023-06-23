const db = require("../../database/db");

const eliminarRol = ( '/delete/:id', (req, res) =>{
  const sql = "DELETE FROM rol WHERE ID_Rol = ?";
  const id = req.params.id;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Message: "Error en el servidor" });
    }

    return res.json(result);
  });
});

module.exports = { eliminarRol };