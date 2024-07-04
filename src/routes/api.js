import express from 'express'

import * as userController from '../controllers/user/user.controller'
import apiAuth from '../middleware/apiAuth'

const router = express.Router()

//= ===============================
// API routes
//= ===============================
router.get('/dashboard', apiAuth, userController.dashboard)
router.get('/get-users', apiAuth, userController.getUsers)

module.exports = router
