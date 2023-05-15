const { Router } = require('express')
const router = Router()

const {postUsuario } = require('../controllers/login')
const {postRegistro } = require('../controllers/register')
const {getInformacionDelCliente} = require('../controllers/prueba')
const {authenticateToken} = require('../controllers/authenticateToken');
const {logout} = require('../controllers/logout')
const {listarPedidos} = require('../controllers/Pedido/listar')
const {validarCorreo} = require('../controllers/reset')

router.post('/login',postUsuario)
router.post('/register', postRegistro)
router.get('/prueba',authenticateToken, getInformacionDelCliente)
router.get('/logout',logout)
router.get('/admin/pedidos',listarPedidos)
router.post('/recuperar',validarCorreo)



module.exports = router