const express = require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router = express.Router()

const { body } = require('express-validator');
const userController = require('../Controllers/user.js')

router.get('/', userController.getUsers)

router.post('/createUser',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom(async (email) => {
        const user = await User.find(email);
        if (user[0].length > 0) {
          return Promise.reject('Email address already exist!');
        }
      })
      .normalizeEmail(),
    body('password').trim().isLength({ min: 7 }),
    body('name').trim().not().isEmpty(),
    body('surname').trim().not().isEmpty(),
    body('category').trim().not().isEmpty(),

  ],
  userController.createUser
);
router.post('/login', userController.login)
router.post('/refreshToken', userController.refreshToken)
router.delete('/logout', userController.logout)

router.get('/auth', userController.validateToken, userController.authenticated)
router.get('/createGuardies', userController.createGuardies)



module.exports = router
