const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoriaController = require('../Controllers/categoria.js');

router.get('/getCategories', categoriaController.getCategories);
//router.get('/createCategoria', categoriaController.createCategoria);