const db = require("../../database/db");

const postCrearRol = (req, res) => {
  const { rol, permisos } = req.body; // Obtén el campo "rol" y "permisos" del cuerpo de la solicitud

  const sqlRol = "INSERT INTO rol (Nombre_Rol) VALUES (?)"; 
  const valuesRol = [rol]; 

  db.query(sqlRol, valuesRol, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({ error: "Inserting data error in server" });
    }

    const roleId = result.insertId; // Obtén el ID del rol recién insertado

    // Crea un array de valores para el INSERT de permiso_x_rol
    const valuesRolPermiso = permisos.map((permisoId) => [roleId, permisoId]);

    const sqlRolPermiso = "INSERT INTO permiso_x_rol (ID_Rol, ID_Permiso) VALUES ?";

    db.query(sqlRolPermiso, [valuesRolPermiso], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ error: "Inserting data error in server" });
      }
      return res.json({ status: "Success" });
    });
  });
};

module.exports = { postCrearRol };
