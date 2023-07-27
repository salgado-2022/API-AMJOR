const db = require("../../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const postCrearUsuario = (req, res) => {
  const { correo, contrasena, idUsuario } = req.body;

  // Validar que los campos no estén vacíos
  if (!correo || !contrasena || !idUsuario) {
    return res.json({ Error: "Please provide all the required fields." });
  }

  // Validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.json({ Error: "Please provide a valid email address." });
  }

  // Validar que la contraseña tenga al menos 8 caracteres y empiece con mayúscula
  const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  if (!passwordRegex.test(contrasena)) {
    return res.json({
      Error: "Password must be at least 8 characters long and start with an uppercase letter.",
    });
  }

  bcrypt.hash(contrasena.toString(), salt, (err, hash) => {
    if (err) {
      return res.json({ Error: "Error while hashing password" });
    }

    const ID_Rol = 0;

    // Valores a insertar en la tabla usuario
    const values = [correo, hash, ID_Rol, idUsuario];

    // Consulta SQL para insertar un nuevo registro en la tabla usuario
    const sqlInsertUsuario =
      "INSERT INTO usuario (`correo`, `contrasena`, `ID_Rol`, `idUsuario`) VALUES (?)";

    // Ejecutar la consulta SQL con los valores proporcionados
    db.query(sqlInsertUsuario, [values], (err, result) => {
      if (err) {
        console.log(err);
        return res.json({ Error: "Error inserting data in the server" });
      }

      // Si la inserción se realizó correctamente, enviar una respuesta de éxito
      return res.json({ Status: "Success" });
    });
  });
};

module.exports = { postCrearUsuario };
