const db = require("../../database/db");
const bcrypt = require("bcrypt");

const listarEdUsuarios = (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT u.*, r.ID_Rol, c.ID_Cliente, c.Nombre AS Nombre_Cliente, c.Documento AS Documento_Cliente, 
    c.Telefono AS Telefono_Cliente, c.Apellido AS Apellido_Cliente
    FROM usuario u
    INNER JOIN rol r ON u.ID_Rol = r.ID_Rol
    INNER JOIN cliente c ON c.ID_Usuario = u.idUsuario
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
  const nuevoApellido = req.body.apellido;
  const nuevoTelefono = req.body.telefono;
  const nuevoNombre = req.body.nombre;
  const nuevoCorreo = req.body.correo;
  let nuevaContrasena = req.body.contrasena;
  const nuevoID_Rol = req.body.ID_Rol;
  const nuevoEstado = req.body.estado;

  // Consulta SQL para obtener el teléfono actual del cliente
  const obtenerTelefonoActual = "SELECT Telefono FROM cliente WHERE ID_Cliente = ?";
  db.query(obtenerTelefonoActual, [id], (err, resultTelefono) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }
    const sqlCliente = "UPDATE cliente SET Documento = ?, Nombre = ?, Apellido = ?, Telefono = ? WHERE ID_Cliente = ?";
    const valuesCliente = [nuevoDocumento, nuevoNombre, nuevoApellido, nuevoTelefono, id];

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

        // Verificar si se proporcionó un nuevo teléfono o mantener el actual
        if (req.body.telefono !== undefined) {
          const nuevoTelefono = req.body.telefono;
          const sqlTelefono = "UPDATE cliente SET Telefono = ? WHERE ID_Cliente = ?";
          const valuesTelefono = [nuevoTelefono, id];

          db.query(sqlTelefono, valuesTelefono, (err, resultTelefono) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ Message: "Error en el servidor" });
            }
            ejecutarActualizacionUsuario();
          });
        } else {
          ejecutarActualizacionUsuario();
        }

        const ejecutarActualizacionUsuario = () => {
          db.query(sqlUsuario, valuesUsuario, (err, result) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ Message: "Error en el servidor" });
            }
            
            // Después de la actualización, obtener los datos actualizados
            const sql = `
              SELECT u.*, r.ID_Rol, c.ID_Cliente, c.Nombre AS Nombre_Cliente, c.Documento AS Documento_Cliente, 
              c.Telefono AS Telefono_Cliente, c.Apellido AS Apellido_Cliente
              FROM usuario u
              INNER JOIN rol r ON u.ID_Rol = r.ID_Rol
              INNER JOIN cliente c ON c.ID_Usuario = u.idUsuario
              WHERE u.idUsuario = ?;
            `;

            db.query(sql, [id], (err, result) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ Message: "Error en el servidor" });
              }
              
              return res.json(result[0]);  // Retorna los datos actualizados
            });
          });
        };
      };
    });
  });
};

module.exports = { listarEdUsuarios, editarUsuario };
