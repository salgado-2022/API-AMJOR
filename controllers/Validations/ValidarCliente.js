const db = require("../../database/db");
const jwt = require("jsonwebtoken");


const RutaSegura = (req, res) => {

    const token = req.params.token;
    if (!token) {
        return res.status(401).json({ error: "Token no proporcionado" });
    }

    try {
        // Verificar y decodificar el token
        const decodedToken = jwt.verify(token, "Hola");
        const { userId } = decodedToken;

        const sql = "SELECT r.Nombre_Rol from usuario u INNER JOIN  rol r ON u.ID_Rol = r.ID_Rol WHERE u.idUsuario = ?"

        db.query(sql, [userId],(err, result)=>{
            if(err) return res.status(500).json({error: "Error al hacer la consulta"})

            if(result.length ===0) return res.status(500).json({error: "El usuario no existe"})

            if(result[0].Nombre_Rol) {
                return res.status(200).json({Status: "Ok", result})
            }

            res.status(405).json({Status: "Acceso denegado"})
            
        })
    }
    catch {
        return res.status(401).json({ error: "Error en el sistema" });
    }
}


module.exports={RutaSegura}