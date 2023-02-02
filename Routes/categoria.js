const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoriaController = require('../Controllers/categoria.js');
const { validateTokenG } = require('../Utils/utils.js');

router.get('/', validateTokenG, categoriaController.getCategories);
router.post('/createCategoria', validateTokenG, categoriaController.createCategoria);
router.post('/deactivateCategoria', validateTokenG, categoriaController.deactivateCategoria);

module.exports = router