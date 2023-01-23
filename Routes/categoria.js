const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoriaController = require('../Controllers/categoria.js');

router.get('/', categoriaController.getCategories);
router.post('/createCategoria', categoriaController.createCategoria);

module.exports = router