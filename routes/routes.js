const { Router } = require('express');
const router = Router();

const {postUsuario } = require('../controllers/Acceso/login');
const {postRegistro } = require('../controllers/Acceso/register');
const {getInformacionDelCliente} = require('../controllers/prueba');
const {authenticateToken} = require('../controllers/Acceso/authenticateToken');
const {logout} = require('../controllers/Acceso/logout');
const {listarPedidos} = require('../controllers/Pedido/listar');
const {listarInsumo} = require('../controllers/Insumos/listarInsumo');
const {postInsumo } = require('../controllers/Insumos/crearInsumo');
const {listarEdInsumo} = require('../controllers/Insumos/editarInsumo');
const {validarCorreo, actualizarPassword} = require('../controllers/Acceso/reset');
const {validarToken} = require('../controllers/Validations/TokenValidator');
const {DetallePedido} = require('../controllers/Pedido/Detalle')


//GET
router.get('/prueba',authenticateToken, getInformacionDelCliente)
router.get('/logout',logout)
router.get('/admin/pedidos',listarPedidos)
router.get('/admin/pedidos/detalle/:id',DetallePedido)
router.get('/admin/insumos',listarInsumo)
router.get('/admin/insumos/detalle/:id',listarEdInsumo)

//POST
router.post('/login',postUsuario)
router.post('/register', postRegistro)
router.post('/crearInsumo', postInsumo)
router.post('/recuperar',validarCorreo)
router.post('/recovery',validarToken)

//PATCH
router.patch('/actualizar',actualizarPassword)



module.exports = router