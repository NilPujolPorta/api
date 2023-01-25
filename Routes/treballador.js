const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const treballadorController = require('../Controllers/treballador.js')

router.get('/', treballadorController.getTreballadors);

router.post('/createTreballador', treballadorController.createTreballador);
module.exports = router