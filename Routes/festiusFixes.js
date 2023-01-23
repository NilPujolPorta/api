const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const festiusFixesController = require('../Controllers/festiusFixes.js');

router.get('/getFestiusFixes', festiusFixesController.getFestiusFixes);
router.get('/createFestiuFixe', festiusFixesController.createFestiuFixe);