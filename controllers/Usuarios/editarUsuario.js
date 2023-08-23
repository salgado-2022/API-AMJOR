const db = require("../../database/db");
const bcrypt = require("bcrypt");

const listarEdUsuarios = (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT u.*, r.ID_Rol, c.ID_Cliente, c.Nombre AS Nombre_Cliente, c.Documento AS Documento_Cliente
    FROM usuario u
    LEFT JOIN rol r ON u.ID_Rol = r.ID_Rol
    LEFT JOIN cliente c ON c.ID_Usuario = u.idUsuario
    WHERE u.idUsuario = ?;
  `;
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }
    return res.json(result[0]);  // Retorna el primer resultado (debería ser único por ID)
  });
};

const editarUsuario = (req, res) => {
  const id = req.params.id;
  const nuevoDocumento = req.body.documento;
  const nuevoNombre = req.body.nombre;
  const nuevoCorreo = req.body.correo;
  let nuevaContrasena = req.body.contrasena;
  const nuevoID_Rol = req.body.ID_Rol;
  const nuevoEstado = req.body.estado;

  const sqlCliente = "UPDATE cliente SET Documento = ?, Nombre = ? WHERE ID_Cliente = ?";
  const valuesCliente = [nuevoDocumento, nuevoNombre, id];

  db.query(sqlCliente, valuesCliente, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }

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
      const actualizarCamposUsuario = [];
      if (nuevoCorreo) {
        actualizarCamposUsuario.push("correo = ?");
      }
      if (nuevaContrasena) {
        actualizarCamposUsuario.push("contrasena = ?");
      }
      if (nuevoID_Rol !== undefined) {
        actualizarCamposUsuario.push("ID_Rol = ?");
      }
      if (nuevoEstado !== undefined) {
        actualizarCamposUsuario.push("Estado = ?");
      }
      const valuesUsuario = [nuevoCorreo, nuevaContrasena, nuevoID_Rol, nuevoEstado, id];
      const sqlUsuario = "UPDATE usuario SET " + actualizarCamposUsuario.join(', ') + " WHERE idUsuario = ?";

      db.query(sqlUsuario, valuesUsuario, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ Message: "Error en el servidor" });
        }
        return res.json({ Message: "Cliente y usuario actualizados correctamente" });
      });
    };
  });
};

module.exports = { listarEdUsuarios, editarUsuario };
