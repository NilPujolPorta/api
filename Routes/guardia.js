const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const guardiaController = require('../Controllers/guardia.js');

router.get('/', guardiaController.getGuardies);
router.post('/createGuardia', guardiaController.createGuardia);
router.post('/createGuardies', guardiaController.createGuardies);
router.post('/deactivateGuardia', guardiaController.deactivateGuardia);
router.get('/getGuardiesTreballador', guardiaController.getGuardiesTreballador);

module.exports = router