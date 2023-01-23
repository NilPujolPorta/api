const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const plantillaController = require('../Controllers/plantilles.js');

router.get('/', plantillaController.getPlantilles);
router.post('/createPlantilla', plantillaController.createPlantilla);

module.exports = router