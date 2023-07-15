const db = require("../../database/db");

const postCrearRol = (req, res) => {
  const { rol } = req.body; // Obtén el campo "rol" del cuerpo de la solicitud

  const sql = "INSERT INTO rol (Nombre_Rol) VALUES (?)"; 
  const values = [rol]; 

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Inserting data error in server" });
    }
    return res.json({ Status: "Success" });
  });
};

module.exports = { postCrearRol };