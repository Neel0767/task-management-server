import express from 'express'
import validate from 'express-validation'

import * as projectController from '../controllers/project/project.controller'
import * as projectValidator from '../controllers/project/project.validator'

const router = express.Router()

router.get('/', projectController.viewAllProjects)
router.get('/:id', projectController.viewProjectById)
router.post(
  '/projects',
  validate(projectValidator.addProject),
  projectController.addProject
)
router.put(
  '/projects/:id',
  validate(projectValidator.updateProject),
  projectController.updateProject
)
router.delete('/projects/:id', projectController.removeProject)

module.exports = router
