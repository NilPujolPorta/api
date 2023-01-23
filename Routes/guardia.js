const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const guardiaController = require('../Controllers/guardia.js');

router.get('/', guardiaController.getGuardies);
router.post('/createGuardies', guardiaController.createGuardies);
router.post('/createGuardia', guardiaController.createGuardia);

module.exports = router