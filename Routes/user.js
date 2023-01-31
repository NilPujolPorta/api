const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()

const { body } = require('express-validator');
const userController = require('../Controllers/user.js')

router.get('/auth', userController.validateToken, userController.authenticated)



module.exports = router
