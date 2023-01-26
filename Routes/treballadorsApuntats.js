const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const treballadorsApuntatsController = require('../Controllers/treballadorsApuntats.js')

router.get('/', treballadorsApuntatsController.getTrebelladorsApuntats);
router.get('/getIDGuardiesByTreballador', treballadorsApuntatsController.getIDGuardiesByTreballador)
router.get('/getIDTreballadorsByIdGuardia', treballadorsApuntatsController.getIDTreballadorsByIdGuardia)
router.post('/apuntarTreballador', treballadorsApuntatsController.apuntarTreballador);
router.post('/desapuntarTreballador', treballadorsApuntatsController.desapuntarTreballador);
router.post('/seleccioTreballadors', treballadorsApuntatsController.seleccioTreballadors);
router.post('/triarTreballador', treballadorsApuntatsController.triarTreballador);
router.post('/noTriarTreballador', treballadorsApuntatsController.noTriarTreballador);

module.exports = router


