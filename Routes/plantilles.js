const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const plantillaController = require('../Controllers/plantilles.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, plantillaController.getPlantilles);
router.post('/createPlantilla', validateTokenG, plantillaController.createPlantilla);
router.post('/deactivatePlantilla', validateTokenG, plantillaController.deactivatePlantilla);

module.exports = router