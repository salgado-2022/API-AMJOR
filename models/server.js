const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
const upload = require('./multerConfig');
const http = require('http');
const socketio = require('socket.io');
const {listarPedidos} = require('../controllers/Pedido/listar')
const db = require('../database/db') // Incluir db connection

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/api/';
        this.middlewares();
        this.dbConectar();
        this.routes(); // Disparar el método routes
        this.server = http.createServer(this.app);
        this.io = socketio(this.server, {
            cors: {
                origin: "*"
            },
        });
        this.setupSocket();
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
            origin: ["http://localhost:3000"],
            methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
            credentials: true
        }));
        // Permite peticiones json a la API
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(upload.single('image'));
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuarioPath, require('../routes/routes'))
    }

    setupSocket() {
        listarPedidos(this.io);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Escuchando desde http://localhost:${this.port}`);
        });
    }

}

module.exports = Server