import express from 'express'
import validate from 'express-validation'

import * as taskController from '../controllers/task/task.controller'
import * as taskValidator from '../controllers/task/task.validator'

const router = express.Router()

router.get('/me', taskController.listUserTasks)
router.get('/:id', taskController.viewTaskById)
router.post('/', validate(taskValidator.addTask), taskController.addTask)
router.put(
  '/:id',
  validate(taskValidator.updateTask),
  taskController.updateTaskDetails
)
router.delete('/:id', taskController.removeTask)

module.exports = router
