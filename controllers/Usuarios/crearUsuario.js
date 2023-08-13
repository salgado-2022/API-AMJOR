const db = require("../../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const postCrearUsuario = (req, res) => {
  const { correo, contrasena, documento, nombre, apellido, telefono, rol } = req.body;
  console.log(rol)

  bcrypt.hash(contrasena.toString(), salt, (err, hash) => {
    if (err) {
      return res.json({ Error: "Error en la contraseña" });
    }

      // Valores a insertar en la tabla usuario
      const usuarioValues = [correo, hash, rol];

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
  };

module.exports = { postCrearUsuario };
