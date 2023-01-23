const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const diaController = require('../Controllers/dia.js');

router.get('/getDies', diaController.getDies);
router.get('/createDia', diaController.createDia);