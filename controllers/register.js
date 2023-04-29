const db = require("../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const postRegistro = (req , res) =>{
    const sql ="INSERT INTO usuario (`ID_Rol`,`Correo`,`contrasena`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) =>{
        if(err) return res.json({Error: "Error for hassing password"});
        
        const values =[
            req.body.Rol = 1,
            req.body.email,
            hash
        ]
        db.query(sql, [values] , (err, result ) => {
            if(err) return res.json({Error: " Inserting data error in server "});
            return res.json({Status: "Success"});

        })
    })

}

module.exports = {postRegistro}