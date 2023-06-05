const db = require("../../database/db");
const upload = require("../../models/multerConfig")

const postAncheta = (upload.single('image') ,(req, res) =>{

        const sql ="INSERT INTO ancheta (`NombreAncheta`,`Descripcion`,`PrecioUnitario`,`image`) VALUES (?)";
    
        const values =[
            req.body.NombreAncheta,
            req.body.Descripcion,
            req.body.PrecioUnitario,
            req.file.filename
        ]
        
        db.query(sql, [values] , (err, result ) => {
            if (err) {
                console.error(err);
                return res.json({ Error: "Error inserting formdata" });
            }
            return res.json({Status: "Success"});
    })

})

module.exports = {postAncheta}