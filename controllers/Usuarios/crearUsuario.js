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

const verificarDocumentoExistente = (documento, callback) => {
  const sql = "SELECT COUNT(*) AS count FROM cliente WHERE Documento = ?";
  db.query(sql, [documento], (err, result) => {
    if (err) {
      console.log(err);
      return callback(err);
    }
    const count = result[0].count;
    return callback(null, count > 0);
  });
};

const postCrearUsuario = (req, res) => {
  const { correo, contrasena, documento, nombre, apellido, telefono } = req.body;

  // Validar que los campos no estén vacíos
  if (!correo || !contrasena || !documento || !nombre || !apellido || !telefono) {
    return res.json({ Error: "Por favor complete todos los campos." });
  }

  // Restricción de longitud y tipo para el campo "documento"
  if (!/^\d{10}$/.test(documento)) {
    return res.json({ Error: "El documento debe tener exactamente 10 dígitos numéricos." });
  }

  // Validar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.json({ Error: "Ingrese un correo válido." });
  }

  // Validar que la contraseña tenga al menos 5 caracteres y empiece con mayúscula
  const passwordRegex = /^(?=.*[A-Z])[a-zA-Z0-9]{5,}$/;
  if (!passwordRegex.test(contrasena)) {
    return res.json({
      Error:
        "La contraseña debe tener al menos 5 caracteres y comenzar con mayúscula.",
    });
  }

  verificarCorreoExistente(correo, (err, existeCorreo) => {
    if (err) {
      return res.json({ Error: "Error en el servidor." });
    }

    if (existeCorreo) {
      return res.json({ Error: "El correo ya está registrado." });
    }

    verificarDocumentoExistente(documento, (err, existeDocumento) => {
      if (err) {
        return res.json({ Error: "Error en el servidor." });
      }

      if (existeDocumento) {
        return res.json({ Error: "El documento ya existe." });
      }

      bcrypt.hash(contrasena.toString(), salt, (err, hash) => {
        if (err) {
          return res.json({ Error: "Error en la contraseña" });
        }

        const ID_Rol = 1; // Asignar el ID_Rol adecuado

        // Valores a insertar en la tabla usuario
        const usuarioValues = [correo, hash, ID_Rol];

        // Consulta SQL para insertar un nuevo registro en la tabla usuario
        const sqlInsertUsuario =
          "INSERT INTO usuario (`correo`, `contrasena`, `ID_Rol`) VALUES (?)";

        db.query(sqlInsertUsuario, [usuarioValues], (err, usuarioResult) => {
          if (err) {
            console.log(err);
            return res.json({ Error: "Error insertando datos en el servidor" });
          }

          // Inserción en la tabla cliente
          const clienteValues = [documento, nombre, apellido, telefono, usuarioResult.insertId];

          // Consulta SQL para insertar un nuevo registro en la tabla cliente
          const sqlInsertCliente =
            "INSERT INTO cliente (`Documento`, `Nombre`, `Apellido`, `Telefono`, `ID_Usuario`) VALUES (?)";

          db.query(sqlInsertCliente, [clienteValues], (err, clienteResult) => {
            if (err) {
              console.log(err);
              return res.json({ Error: "Error insertando datos en el servidor" });
            }

            // Si la inserción se realizó correctamente, enviar una respuesta de éxito
            return res.json({ Status: "Success" });
          });
        });
      });
    });
  });
};

module.exports = { postCrearUsuario };
