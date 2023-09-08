process.on('uncaughtException', (err) => {
    console.error('Error no manejado:', err);
    // Manejar las excepciones y errores evitando que se cierre el servidor NodeJS.
    // Puedes realizar acciones adicionales aquí, como enviar notificaciones o limpiar recursos.
});

const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const upload = require('./multerConfig');
// const UserImg = require('./multerUsers')
const http = require('http');
const db = require('../database/db') // Incluir db connection

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/';
        this.middlewares();

        this.routes(); // Disparar el método routes
        this.server = http.createServer(this.app);
    }
    async dbConectar() {
        await db.connect(function (err) {
            if (err) {
                throw err
            } else {
                console.log("Conectado con la base de datos correctamente.");
            }
        })
    }

    middlewares() {
        this.app.use(cors({
            origin: ["https://amjor.shop","https://www.amjor.shop","https://dashboard.amjor.shop","https//www.dashboard.amjor.shop","http://34.173.120.70","http://34.173.120.70:80","http://34.173.120.70:3000","http://34.173.120.70:3001","http://localhost:3000","http://localhost:3001"],
            methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
            credentials: true
        }));
        // Permite peticiones json a la API
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(express.static('public'));
        this.app.use(upload.single('image'));
    }

    routes() {
        this.app.use(this.usuarioPath, require('../routes/routes'))
    }


    listen() {
        this.server.listen(this.port, () => {
            console.log(`Escuchando desde http://${process.env.API_URL}:${this.port}`);
        });
    }

}

module.exports = Server