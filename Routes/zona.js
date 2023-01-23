const express = require('express')
const router = express.Router()

const { body } = require('express-validator');
const zonaController = require('../Controllers/zona.js')

router.get('/', zonaController.getZones);

router.post('/createZona',
    [
        body('nom').not().isEmpty(),
        body('actiu').not().isEmpty(),
        body('usuariMOD').not().isEmpty()
    ],
    zonaController.createZona
);
module.exports = router