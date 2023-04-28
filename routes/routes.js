const { Router } = require('express')
const router = Router()

const {postUsuario } = require('../controllers/login')
const {postRegistro } = require('../controllers/register')


router.post('/login', postUsuario)
router.post('/register', postRegistro)


module.exports = router