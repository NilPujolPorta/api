const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const zonaController = require('../Controllers/torn.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, zonaController.getTorns);

router.post('/createTorn', validateTokenG, zonaController.createTorn);
module.exports = router