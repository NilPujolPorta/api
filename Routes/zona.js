const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const zonaController = require('../Controllers/zona.js')

router.get('/', zonaController.getZones);

router.post('/createZona', zonaController.createZona);
module.exports = router