const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const diaController = require('../Controllers/dia.js');
const { validateTokenG } = require('../Utils/utils');

router.get('/', validateTokenG, diaController.getDies);
router.post('/createDia', validateTokenG, diaController.createDia);
router.post('/getDies', validateTokenG, diaController.createDia);
router.post('/deactivateDia', validateTokenG, diaController.deactivateDia);

module.exports = router
