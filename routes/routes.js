const { Router } = require('express');
const router = Router();

const {postUsuario } = require('../controllers/Acceso/login');
const {postRegistro } = require('../controllers/Acceso/register');
const {getInformacionDelCliente} = require('../controllers/prueba');
const {authenticateToken} = require('../controllers/Acceso/authenticateToken');
const {logout} = require('../controllers/Acceso/logout');
const {listarPedidos} = require('../controllers/Pedido/listar');

//INSUMOS
const {listarInsumo} = require('../controllers/Insumos/listarInsumo');
const {postInsumo } = require('../controllers/Insumos/crearInsumo');
const {listarEdInsumo} = require('../controllers/Insumos/editarInsumo');
const {editarInsumo} = require('../controllers/Insumos/editarInsumo');
const {eliminarInsumo} = require('../controllers/Insumos/eliminarInsumo');

//ANCHETAS
const {listarAncheta} = require('../controllers/Anchetas/listarAncheta');
const {postAncheta} = require('../controllers/Anchetas/crearAncheta');
const {verInsumos} = require ('../controllers/Anchetas/verInsumos');
const {listarEdAncheta} = require('../controllers/Anchetas/editarAncheta');
const {editarAncheta} = require('../controllers/Anchetas/editarAncheta');
const {eliminarAncheta} = require('../controllers/Anchetas/eliminarAncheta');

const {validarCorreo, actualizarPassword} = require('../controllers/Acceso/reset');
const {validarToken} = require('../controllers/Validations/TokenValidator');
const {DetallePedido} = require('../controllers/Pedido/Detalle')
const {DetalleAncheta} = require('../controllers/Pedido/DetalleInsumo')


//GET
router.get('/prueba',authenticateToken, getInformacionDelCliente)
router.get('/logout',logout)
router.get('/admin/pedidos',listarPedidos)
router.get('/admin/pedidos/detalle/:id',DetallePedido)
router.get('/admin/pedidos/detalle/ancheta/:id',DetalleAncheta)
router.get('/admin/anchetas',listarAncheta)
router.get('/admin/insumos',listarInsumo)
router.get('/admin/anchetas/insancheta/:id',verInsumos)
router.get('/admin/anchetas/anchellamada/:id',listarEdAncheta)
router.get('/admin/insumos/insullamada/:id',listarEdInsumo)

//POST
router.post('/login',postUsuario)
router.post('/register', postRegistro)
router.post('/crearInsumo', postInsumo)
router.post('/crearAncheta', postAncheta)
router.post('/recuperar',validarCorreo)
router.post('/recovery',validarToken)

//PATCH
router.patch('/actualizar',actualizarPassword)

//PUT
router.put('/admin/anchetas/anchetaedit/:id',editarAncheta)
router.put('/admin/insumos/insumoedit/:id',editarInsumo)

//DELETE
router.delete('/admin/insumos/insumodel/:id',eliminarInsumo)
router.delete('/admin/anchetas/anchetadel/:id',eliminarAncheta)

module.exports = router