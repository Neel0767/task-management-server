import express from 'express'
import validate from 'express-validation'
import apiAuth from '../middleware/apiAuth'

import * as teamController from '../controllers/team/team.controller'
import * as teamValidator from '../controllers/team/team.validator'

const router = express.Router()

router.get('/', teamController.viewAllTeams)
router.get('/:id', teamController.viewTeamById)
router.post('/', validate(teamValidator.addTeam), teamController.addTeam)
router.put(
  '/:id',
  validate(teamValidator.updateTeam),
  teamController.updateTeamDetails
)
router.post(
  '/:id/users',
  validate(teamValidator.updateTeamMembers),
  teamController.addTeamMembers
)
router.delete(
  '/:id/users',
  validate(teamValidator.updateTeamMembers),
  teamController.removeTeamMembers
)
router.delete('/:id', teamController.removeTeam)

module.exports = router
