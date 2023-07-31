const db = require("../../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const postCrearUsuario = (req, res) => {
  const { correo, contrasena } = req.body;

  // Validar que los campos no estén vacíos
  if (!correo || !contrasena) {
    return res.json({ Error: "Porfavor complete los campos." });
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
      Error: "La contraseña debe de tener minimo 5 caracteres y la primera letra debe de ser Mayuscula.",
    });
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
        return res.json({ Error: "Error inserting data in the server" });
      }

      // Si la inserción se realizó correctamente, enviar una respuesta de éxito
      return res.json({ Status: "Success" });
    });
  });
};

module.exports = { postCrearUsuario };
