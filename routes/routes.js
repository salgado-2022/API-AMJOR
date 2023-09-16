const { Router } = require('express');
const router = Router();


// ACCESO
const { postUsuario } = require('../controllers/Acceso/login');
const { postRegistro } = require('../controllers/Acceso/register');
const { getInformacionDelCliente } = require('../controllers/prueba');
const { authenticateToken } = require('../controllers/Acceso/authenticateToken');
const { logout } = require('../controllers/Acceso/logout');
const { searchUser } = require("../controllers/Acceso/login");
const { searchPermissions } = require('../controllers/Acceso/permisos')

// CARRITO
const { enviarPedido } = require('../controllers/Carrito/enviarPedido');

const { searchUserInfoCheckout } = require('../controllers/Carrito/userInfoCheckout');


// DASHBOARD
const { buscarCantidadPedidos } = require('../controllers/Dashboard/searchPedidos');
const { buscarCantidadUsuarios } = require('../controllers/Dashboard/searchUsuarios');
const { buscarPedidosPendientes } = require('../controllers/Dashboard/searchPedidosPendientes');
const { buscarTotalVentas } = require('../controllers/Dashboard/searchTotalVentas');
const { VentasGrafica } = require('../controllers/Dashboard/ventas')
const { MasVendidas } = require('../controllers/Dashboard/masVendidas')


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
const { ConsultarInfoUser } = require('../controllers/Usuarios/Perfil')
const { ActualizarPerfil } = require('../controllers/Usuarios/Perfil')

//CLIENTES
const { listarCliente } = require('../controllers/Clientes/listarCliente');
const { editarCliente} = require('../controllers/Clientes/editarCliente');


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

const { validarCorreo, actualizarPassword } = require('../controllers/Acceso/reset');
const { ValidarAdmin } = require('../controllers/Validations/TokenValidator');

//Pedidos
const { aceptar } = require('../controllers/Pedido/Aceptar');
const { rechazar } = require('../controllers/Pedido/Rechazar')
const { DetallePedido } = require('../controllers/Pedido/Detalle');
const { DetalleAncheta } = require('../controllers/Pedido/DetalleInsumo');
const { Preparacion, Preparado, Despachado } = require('../controllers/Pedido/ActualizarStatus');
const { listarPedidos } = require('../controllers/Pedido/listar')
const { creado } = require('../controllers/Pedido/Creado')

//Ventas
const { listarVentas } = require('../controllers/Ventas/listarVentas')
const { listarVentasCliente } = require('../controllers/Ventas/listarVentasCliente')

//Validaciones
const { validarDocumento } = require('../controllers/Acceso/validarRegistros');
const { validarEmail } = require('../controllers/Acceso/validarRegistros');
const { validarAncheta } = require('../controllers/Anchetas/validarAncheta');
const { validarInsumo } = require('../controllers/Insumos/validarInsumo');
const { RutaSegura } = require('../controllers/Validations/ValidarCliente');
const {Token} = require('../controllers/Validations/Token')
const { validarRol } = require('../controllers/Configuración/validarRol');





//GET
router.get('/prueba', authenticateToken, getInformacionDelCliente)
router.get('/logout', logout)
router.get('/admin/listar/pedido', listarPedidos);
router.get('/admin/pedidos/detalle/:id', DetallePedido)
router.get('/admin/pedidos/detalle/ancheta/:id', DetalleAncheta)
router.get('/admin/anchetas', listarAncheta)
router.get('/admin/insumos', listarInsumo)
router.get('/admin/anchetas/insancheta/:id', verInsumos)
router.get('/admin/anchetas/anchellamada/:id', listarEdAncheta)
router.get('/admin/insumos/insullamada/:id', listarEdInsumo)
router.get('/admin/pedidos/success/', aceptar)
router.get('/admin/pedidos/refused/', rechazar)
router.get('/pedido/creado/', creado)
router.get('/admin/usuario', listarUsuario)
router.get('/admin/cliente', listarCliente)
router.get('/admin/usuario/usullamada/:id', listarEdUsuarios);
router.get('/admin/configuracion', listarConfiguracion);
router.get('/admin/listpermisos', listarPermisos);
router.get('/admin/configuracion/confillamada/:id', listarEdRol)
router.get('/search/:token', searchUser);
router.get('/admin/search/permisos/:idUser', searchPermissions)
router.get('/ventas/cliente/:token', listarVentasCliente)
router.get('/validar/cliente/:token', RutaSegura)
router.get('/perfil/user/:id', ConsultarInfoUser)
router.get('/validar/admin/acceso/:token', ValidarAdmin)


router.get('/admin/getinfo/ventasmes', VentasGrafica)
router.get('/admin/getinfo/anchetas/masvendidas', MasVendidas)
router.get('/admin/getinfo/totalpedidos', buscarCantidadPedidos)
router.get('/admin/getinfo/totalusuarios', buscarCantidadUsuarios)
router.get('/admin/getinfo/pedidospendientes', buscarPedidosPendientes)
router.get('/admin/getinfo/totalventas', buscarTotalVentas)
router.get('/checkout/searchuserinfo/:userId', searchUserInfoCheckout)

router.get('/admin/listar/ventas', listarVentas)


//POST
router.post('/login', postUsuario)
router.post('/register', postRegistro)
router.post('/crearInsumo', postInsumo)
router.post('/crearAncheta', postAncheta)
router.post('/recuperar', validarCorreo)
router.post('/crearUsuario', postCrearUsuario)
router.post('/crearRol', postCrearRol)
router.post('/enviarPedido', enviarPedido)
router.post('/recovery', Token)


//POST VALIDACIONES
router.post('/validate/documento', validarDocumento)
router.post('/validate/email', validarEmail)
router.post('/validate/ancheta', validarAncheta)
router.post('/validate/insumo', validarInsumo)
router.post('/validate/rol', validarRol)




//PATCH
router.patch('/actualizar', actualizarPassword)

//PUT
router.put('/admin/anchetas/anchetaedit/:id', editarAncheta)
router.put('/admin/insumos/insumoedit/:id', editarInsumo)
router.put('/admin/usuario/usuariarioedit/:id', editarUsuario);
router.put('/admin/cliente/clienteedit/:id', editarCliente);
router.put('/admin/configuracion/confiedit/:id', editarRol);
router.put('/admin/pedido/status/preparacion/:idPedido', Preparacion)
router.put('/admin/pedido/status/preparado/:idPedido', Preparado)
router.put('/admin/pedido/status/despachado/:idPedido', Despachado)
router.put('/user/perfil/update/:id', ActualizarPerfil)

//DELETE
router.delete('/admin/insumos/insumodel/:id', eliminarInsumo)
router.delete('/admin/usuarios/Usuariodel/:id', eliminarUsuario)
router.delete('/admin/configuracion/Confidel/:id', eliminarRol);

module.exports = router