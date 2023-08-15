const db = require("../../database/db");
const bcrypt = require("bcrypt");

const listarEdUsuarios = (req, res) => {
  const sql = `
    SELECT u.*, r.ID_Rol
    FROM usuario u
    LEFT JOIN rol r ON u.ID_Rol = r.ID_Rol
    WHERE u.idUsuario = ?
  `;
  const id = req.params.id;
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }
    return res.json(result);
  });
};

const editarUsuario = (req, res) => {
  const sql = "UPDATE usuario SET correo = ?, contrasena = ?, ID_Rol = ? WHERE idUsuario = ?";
  const id = req.params.id;
  const nuevoCorreo = req.body.correo;
  let nuevaContrasena = req.body.contrasena;
  const nuevoID_Rol = req.body.ID_Rol;

  const obtenerContrasenaActual = "SELECT contrasena FROM usuario WHERE idUsuario = ?";
  db.query(obtenerContrasenaActual, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

    const contrasenaActual = result[0].contrasena;

    if (!nuevaContrasena) {
      // Si no ingresa cambios para una nueva contraseña, mantener la contraseña actual
      nuevaContrasena = contrasenaActual;
      ejecutarActualizacion();
    } else {
      // Si se ingresa una nueva contraseña, encriptarla y luego realizar la actualización
      bcrypt.hash(nuevaContrasena, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Message: "Error en el servidor" });
        }
        nuevaContrasena = hash;
        ejecutarActualizacion();
      });
    }
  });

  const ejecutarActualizacion = () => {
    db.query(sql, [nuevoCorreo, nuevaContrasena, nuevoID_Rol, id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Message: "Error en el servidor" });
      }
      return res.json(result);
    });
  };
};

module.exports = { listarEdUsuarios, editarUsuario };
