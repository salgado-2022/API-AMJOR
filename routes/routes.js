const { Router } = require('express');
const router = Router();

const { postUsuario } = require('../controllers/Acceso/login');
const { postRegistro } = require('../controllers/Acceso/register');
const { getInformacionDelCliente } = require('../controllers/prueba');
const { authenticateToken } = require('../controllers/Acceso/authenticateToken');
const { logout } = require('../controllers/Acceso/logout');
const { searchUser} = require("../controllers/Acceso/login")

// CARRITO
const { enviarPedido } = require('../controllers/Carrito/enviarPedido');

const { searchUserInfoCheckout } = require('../controllers/Carrito/userInfoCheckout');


// DASHBOARD
const { buscarCantidadPedidos } = require('../controllers/Dashboard/searchPedidos');
const { buscarCantidadUsuarios } = require('../controllers/Dashboard/searchUsuarios');
const { buscarPedidosPendientes } = require('../controllers/Dashboard/searchPedidosPendientes');
const { buscarTotalVentas } = require('../controllers/Dashboard/searchTotalVentas');


//CONFIGURACION
const { postCrearRol } = require('../controllers/Configuración/crearRol');
const { listarConfiguracion } = require('../controllers/Configuración/listarConfiguracion');
const { listarPermisos } = require('../controllers/Configuración/listarPermisos');
const { listarEdRol, editarRol } = require('../controllers/Configuración/editarConfiguracion');
const { eliminarRol } = require('../controllers/Configuración/eliminarConfiguracion');



//USUARIOS
const { postCrearUsuario } = require('../controllers/Usuarios/crearUsuario');
const { listarUsuario } = require('../controllers/Usuarios/listarUsuario');
const { listarEdUsuarios, editarUsuario } = require('../controllers/Usuarios/editarUsuario');
const { eliminarUsuario } = require('../controllers/Usuarios/eliminarUsuario');


//INSUMOS
const { listarInsumo } = require('../controllers/Insumos/listarInsumo');
const { postInsumo } = require('../controllers/Insumos/crearInsumo');
const { listarEdInsumo, editarInsumo } = require('../controllers/Insumos/editarInsumo');
const { eliminarInsumo } = require('../controllers/Insumos/eliminarInsumo');

//ANCHETAS
const { listarAncheta } = require('../controllers/Anchetas/listarAncheta');
const { postAncheta } = require('../controllers/Anchetas/crearAncheta');
const { verInsumos } = require('../controllers/Anchetas/verInsumos');
const { listarEdAncheta, editarAncheta } = require('../controllers/Anchetas/editarAncheta');
const { eliminarAncheta } = require('../controllers/Anchetas/eliminarAncheta');

const { validarCorreo, actualizarPassword } = require('../controllers/Acceso/reset');
const { validarToken } = require('../controllers/Validations/TokenValidator');

//Pedidos
const { aceptar } = require('../controllers/Pedido/Aceptar');
const { rechazar} = require('../controllers/Pedido/Rechazar')
const { DetallePedido } = require('../controllers/Pedido/Detalle');
const { DetalleAncheta } = require('../controllers/Pedido/DetalleInsumo');

//Validaciones
const {validarDocumento} = require('../controllers/Acceso/validarRegistros')
const {validarEmail} = require('../controllers/Acceso/validarRegistros');





//GET
router.get('/prueba', authenticateToken, getInformacionDelCliente)
router.get('/logout', logout)
router.get('/admin/pedidos/detalle/:id', DetallePedido)
router.get('/admin/pedidos/detalle/ancheta/:id', DetalleAncheta)
router.get('/admin/anchetas', listarAncheta)
router.get('/admin/insumos', listarInsumo)
router.get('/admin/anchetas/insancheta/:id', verInsumos)
router.get('/admin/anchetas/anchellamada/:id', listarEdAncheta)
router.get('/admin/insumos/insullamada/:id', listarEdInsumo)
router.get('/admin/pedidos/success/', aceptar)
router.get('/admin/pedidos/refused/', rechazar)
router.get('/admin/usuario', listarUsuario)
router.get('/admin/usuario/usullamada/:id', listarEdUsuarios);
router.get('/admin/configuracion', listarConfiguracion);
router.get('/admin/listpermisos', listarPermisos);
router.get('/admin/configuracion/confillamada/:id', listarEdRol)
router.get('/search/:token', searchUser);


router.get('/admin/getinfo/totalpedidos', buscarCantidadPedidos)
router.get('/admin/getinfo/totalusuarios', buscarCantidadUsuarios)
router.get('/admin/getinfo/pedidospendientes', buscarPedidosPendientes)
router.get('/admin/getinfo/totalventas', buscarTotalVentas)

router.get('/checkout/searchuserinfo/:userId', searchUserInfoCheckout)
//POST
router.post('/login', postUsuario)
router.post('/register', postRegistro)
router.post('/crearInsumo', postInsumo)
router.post('/crearAncheta', postAncheta)
router.post('/recuperar', validarCorreo)
router.post('/recovery', validarToken)
router.post('/crearUsuario', postCrearUsuario)
router.post('/crearRol', postCrearRol)

router.post('/enviarPedido', enviarPedido)

//POST VALIDACIONES
router.post('/validate/documento', validarDocumento)
router.post('/validate/email', validarEmail)




//PATCH
router.patch('/actualizar', actualizarPassword)

//PUT
router.put('/admin/anchetas/anchetaedit/:id', editarAncheta)
router.put('/admin/insumos/insumoedit/:id', editarInsumo)
router.put('/admin/usuario/usuariarioedit/:id', editarUsuario);
router.put('/admin/configuracion/confiedit/:id', editarRol);

//DELETE
router.delete('/admin/insumos/insumodel/:id', eliminarInsumo)
router.delete('/admin/anchetas/anchetadel/:id', eliminarAncheta)
router.delete('/admin/usuarios/Usuariodel/:id', eliminarUsuario)
router.delete('/admin/configuracion/Confidel/:id', eliminarRol);

module.exports = router