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

if (!nuevaContrasena) {
   ActualizarUsuario = "UPDATE usuario SET ID_Rol = ?, correo = ?, Estado = ? WHERE idUsuario = ?";
  values = [ nuevoID_Rol,nuevoCorreo, nuevoEstado, id ]
} else {
   ActualizarUsuario = "UPDATE usuario SET ID_Rol = ?, correo = ?, contrasena = ?, Estado = ? WHERE idUsuario = ?";
  bcrypt.hash(nuevaContrasena, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ Message: "Error en el servidor" });
    }
    nuevaContrasena = hash;

  }); 
  values = [ nuevoID_Rol,nuevoCorreo,nuevaContrasena, nuevoEstado, id ]
}

db.query(ActualizarUsuario, values, (err, result) => {

  if (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error en el servidor" });
  }
  const ActualizarClientes = "UPDATE cliente SET Documento = ?, Nombre = ?, Apellido = ?, Telefono = ? WHERE ID_Usuario = ?";

db.query(ActualizarClientes, [ nuevoDocumento,nuevoNombre,nuevoApellido, nuevoTelefono, id ], (err, result) => {
  if (err) {
    console.log(err);
    return res.status(500).json({ Message: "Error en el servidor" });
  }
  });
});

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

};

module.exports = { listarEdUsuarios, editarUsuario };