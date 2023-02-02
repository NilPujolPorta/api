const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const zonaController = require('../Controllers/zona.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, zonaController.getZones);

router.post('/createZona', validateTokenG, zonaController.createZona);
module.exports = router