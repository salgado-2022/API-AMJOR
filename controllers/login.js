const db = require("../database/db");

const postUsuario = (req,res) => {
    const sql = "SELECT * FROM usuario WHERE Correo = ? AND contrasena = ? ";
    const values = [
        req.body.email,
        req.body.password
    ]
    db.query(sql,[req.body.email, req.body.password], (err, data ) =>{
        if(err) return res.json("Login Faild");
        if(data.length >0 ){
            return res.json({Status: "Success"})
        }else{
            return res.json("No record")
            
        }
        })
}

module.exports = {postUsuario}