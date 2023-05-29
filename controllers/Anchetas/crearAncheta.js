const db = require("../../database/db");
const upload = require("../../models/multerConfig")

const postAncheta = (req, res) =>{
    upload.single('image')(req, res, (err) => {
        console.log(req.file);
        const values =[
            req.body.NombreAncheta,
            req.body.Descripcion,
            req.body.PrecioUnitario,
            req.body.ID_Estado,
            req.file.filename
        ]
        const sql ="INSERT INTO ancheta (`NombreAncheta`,`Descripcion`,`PrecioUnitario`,`ID_Estado`,`image`) VALUES (?)";
        db.query(sql, [values] , (err, result ) => {
            if (err) {
                console.error(err);
                return res.json({ Error: "Error inserting formdata" });
            }
            console.log(req.file);
            return res.json({Status: "Success"});
    })

})
}

module.exports = {postAncheta}