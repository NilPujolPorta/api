const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const diaController = require('../Controllers/dia.js');

router.get('/', diaController.getDies);
router.post('/createDia', diaController.createDia);

module.exports = router
