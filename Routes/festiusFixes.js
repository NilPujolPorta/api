const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const festiusFixesController = require('../Controllers/festiusFixes.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, festiusFixesController.getFestiusFixes);
router.post('/createFestiuFixe', validateTokenG, festiusFixesController.createFestiuFixe);
router.post('/deactivateFestiuFixe', validateTokenG, festiusFixesController.deactivateFestiuFixe);

module.exports = router