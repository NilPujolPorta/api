const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const festiusFixesController = require('../Controllers/festiusFixes.js');

router.get('/', festiusFixesController.getFestiusFixes);
router.post('/createFestiuFixe', festiusFixesController.createFestiuFixe);

module.exports = router