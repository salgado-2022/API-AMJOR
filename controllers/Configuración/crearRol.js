const db = require("../../database/db");

const postCrearRol = (req, res) => {
  const { rol } = req.body; // Obtén el campo "rol" del cuerpo de la solicitud

  const sql = "INSERT INTO rol (Nombre_Rol) VALUES (?)"; // Insertar el campo "Nombre_Rol" y "ID_Rol" en la tabla "rol"
  const values = [rol]; // Asignar el valor "1" para el campo "ID_Rol" del rol de "Administrador"

  db.query(sql, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ Error: "Inserting data error in server" });
    }
    return res.json({ Status: "Success" });
  });
};

module.exports = { postCrearRol };