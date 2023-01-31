const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const treballadorController = require('../Controllers/treballador.js')

router.get('/', treballadorController.getTreballadors);
router.get('/getTreballador', treballadorController.getTreballador);
router.post('/createTreballador', treballadorController.createTreballador);
router.post('/login', treballadorController.login);
router.post('/logout', treballadorController.logout);
module.exports = router