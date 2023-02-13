const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const treballadorController = require('../Controllers/treballador.js')

router.get('/', treballadorController.validateToken, treballadorController.getTreballadors);
router.post('/getTreballador', treballadorController.validateToken, treballadorController.getTreballador);
router.post('/createTreballador', treballadorController.validateToken, treballadorController.createTreballador);
router.post('/login', treballadorController.login);
router.get('/auth', treballadorController.validateToken, treballadorController.authenticated)
router.get('/refreshToken', treballadorController.validateToken, treballadorController.refreshToken);
router.post('/logout', treballadorController.validateToken, treballadorController.logout);
module.exports = router