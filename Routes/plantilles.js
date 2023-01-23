const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const plantillaController = require('../Controllers/plantilla.js');

router.get('/getPlantilles', plantillaController.getPlantilles);
router.get('/createPlantilla', plantillaController.createPlantilla);