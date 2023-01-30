const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const zonaController = require('../Controllers/torn.js')

router.get('/', zonaController.getTorns);

router.post('/createTorn', zonaController.createTorn);
module.exports = router