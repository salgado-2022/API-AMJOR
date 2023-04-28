const Server = require('./models/server')

require('dotenv').config()

const servidor = new Server

servidor.listen()