import express from 'express'

import * as userController from '../controllers/user/user.controller'

const router = express.Router()

//= ===============================
// API routes
//= ===============================
router.get('/dashboard', userController.dashboard)
router.get('/get-users', userController.getUsers)

module.exports = router
