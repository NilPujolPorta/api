const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const treballadorsApuntatsController = require('../Controllers/treballadorsApuntats.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, treballadorsApuntatsController.getTrebelladorsApuntats);
router.get('/getIDGuardiesByTreballador', validateTokenG, treballadorsApuntatsController.getIDGuardiesByTreballador)
router.get('/getIDTreballadorsByIdGuardia', validateTokenG, treballadorsApuntatsController.getIDTreballadorsByIdGuardia)
router.post('/apuntarTreballador', validateTokenG, treballadorsApuntatsController.apuntarTreballador);
router.post('/desapuntarTreballador', validateTokenG, treballadorsApuntatsController.desapuntarTreballador);
router.post('/seleccioTreballadors', validateTokenG, treballadorsApuntatsController.seleccioTreballadors);
router.post('/triarTreballador', validateTokenG, treballadorsApuntatsController.triarTreballador);
router.post('/noTriarTreballador', validateTokenG, treballadorsApuntatsController.noTriarTreballador);

module.exports = router


