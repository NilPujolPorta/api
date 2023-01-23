const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const guardiaController = require('../Controllers/guardia.js');

router.get('/getGuardia', guardiaController.getGuardies);
router.get('/createGuardies', guardiaController.createGuardies);
router.get('/createGuardia', guardiaController.createGuardia);