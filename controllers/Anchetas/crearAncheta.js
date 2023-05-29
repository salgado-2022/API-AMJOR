const db = require("../../database/db");
const upload = require('../../models/multerConfig');

const postAncheta = (req , res) =>{

    const sql ="INSERT INTO ancheta (`NombreAncheta`,`Descripcion`,`PrecioUnitario`,`ID_Estado`) VALUES (?)";

    const values =[
        req.body.NombreAncheta,
        req.body.Descripcion,
        req.body.PrecioUnitario,
        req.body.ID_Estado
    ]
    db.query(sql, [values] , (err, result ) => {
        if(err) return res.json({Error: " Inserting data error in server "});
        return res.json({Status: "Success"});
    })

}

const postImagen = (req, res) => {
    upload.single('image')(req, res, (err) => {
      const image = req.file.filename;
      const sql ="UPDATE ancheta SET image = ?";
      db.query(sql, [image] , (err, result ) => {
        if (err) {
            console.error(err);
            return res.json({ Error: "Error uploading file" });
        }
        console.log(req.file);
        return res.json({Status: "Success"});
    })
});
};

module.exports = {postAncheta, postImagen}