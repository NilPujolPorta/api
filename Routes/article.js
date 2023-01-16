const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()


const  articleController = require('../Controllers/article.js')

const token = require('../Controllers/validate.js')

router.get('/pvp', token.validateTokenG, articleController.preuvVenta)



module.exports = router