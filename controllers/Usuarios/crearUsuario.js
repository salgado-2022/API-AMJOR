const db = require("../../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const verificarCorreoExistente = (correo, callback) => {
  const sql = "SELECT COUNT(*) AS count FROM usuario WHERE correo = ?";
  db.query(sql, [correo], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    const count = result[0].count;
    return callback(null, count > 0);
  });
};

const postCrearUsuario = (req, res) => {
  const { correo, contrasena } = req.body;

  // Validar que los campos no estén vacíos
  if (!correo || !contrasena) {
    return res.json({ Error: "Por favor complete los campos." });
  }

  // Validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.json({ Error: "Ingrese datos correctos en el correo." });
  }

  // Validar que la contraseña tenga al menos 5 caracteres y empiece con mayúscula
  const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;
  if (!passwordRegex.test(contrasena)) {
    return res.json({
      Error:
        "La contraseña debe de tener mínimo 5 caracteres y la primera letra debe de ser Mayúscula.",
    });
  }

  verificarCorreoExistente(correo, (err, existe) => {
    if (err) {
      return res.json({ Error: "Error en el servidor." });
    }

    if (existe) {
      return res.json({ Error: "El correo ya está registrado." });
    }

    bcrypt.hash(contrasena.toString(), salt, (err, hash) => {
      if (err) {
        return res.json({ Error: "Error en la contraseña" });
      }

      const ID_Rol = 1; // Asignar el ID_Rol adecuado

      // Valores a insertar en la tabla usuario
      const values = [correo, hash, ID_Rol];

      // Consulta SQL para insertar un nuevo registro en la tabla usuario
      const sqlInsertUsuario =
        "INSERT INTO usuario (`correo`, `contrasena`, `ID_Rol`) VALUES (?)";

      // Ejecutar la consulta SQL con los valores proporcionados
      db.query(sqlInsertUsuario, [values], (err, result) => {
        if (err) {
          console.log(err);
          return res.json({ Error: "Error insertando datos en el servidor" });
        }

        // Si la inserción se realizó correctamente, enviar una respuesta de éxito
        return res.json({ Status: "Success" });
      });
    });
  });
};

module.exports = { postCrearUsuario };
