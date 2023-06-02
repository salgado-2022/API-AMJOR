const db = require("../../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const postCrearUsuario = (req , res) =>{

    const sql ="INSERT INTO usuario (`correo`,`contrasena`,`ID_Rol`, `ID_Usuario`) VALUES (?)";
    bcrypt.hash(req.body.contrasena.toString(), salt, (err, hash) =>{
        if(err) return res.json({Error: "Error for hassing password"});
        
        const values =[
            req.body.correo,
            hash,
            req.body.ID_Rol,
            req.body.ID_Usuario
        ]
        db.query(sql, [values] , (err, result ) => {
            if(err){
                console.log(err)
                return res.json({Error: " Inserting data error in server "});
            } 
            
            return res.json({Status: "Success"});
    
        })
    })
   

}

module.exports = {postCrearUsuario}