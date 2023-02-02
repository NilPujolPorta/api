const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const guardiaController = require('../Controllers/guardia.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, guardiaController.getGuardies);
router.post('/createGuardia', validateTokenG, guardiaController.createGuardia);
router.post('/createGuardies', validateTokenG, guardiaController.createGuardies);
router.post('/deactivateGuardia', validateTokenG, guardiaController.deactivateGuardia);
router.post('/getGuardiesTreballador', validateTokenG, guardiaController.getGuardiesTreballador);

module.exports = router