import express from 'express'
import validate from 'express-validation'
import apiAuth from '../middleware/apiAuth'

import * as projectController from '../controllers/project/project.controller'
import * as projectValidator from '../controllers/project/project.validator'

const router = express.Router()

router.get('/', projectController.viewAllProjects)
router.get('/:id', projectController.viewProjectById)
router.post(
  '/',
  validate(projectValidator.addProject),
  apiAuth,
  projectController.addProject
)
router.put(
  '/:id',
  validate(projectValidator.updateProject),
  projectController.updateProject
)
router.delete('/:id', projectController.removeProject)

module.exports = router
