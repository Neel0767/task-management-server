import express from 'express'
import validate from 'express-validation'

import * as userController from '../controllers/user/user.controller'
import * as userValidator from '../controllers/user/user.validator'

const router = express.Router()

router.post('/login', validate(userValidator.login), userController.login)
router.post(
  '/register',
  validate(userValidator.register),
  userController.register
)
router.post(
  '/refresh-token',
  validate(userValidator.refreshToken),
  userController.refreshToken
)

module.exports = router
