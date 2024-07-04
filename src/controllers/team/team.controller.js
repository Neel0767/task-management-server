import { teams as Team, users as User, sequelize } from '../../models'
import { v4 as uuidv4 } from 'uuid'

import { successResponse, errorResponse } from '../../helpers'

export const viewAllTeams = async (req, res) => {
  try {
    const teams = await Team.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
        SELECT COUNT(*)
        FROM user_teams
        WHERE user_teams.teamId = teams.id
      )`),
            'member_count',
          ],
        ],
      },
    })
    return successResponse(req, res, teams)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const viewTeamById = async (req, res) => {
  try {
    const { id } = req.params
    const team = await Team.findOne({
      where: { id },
      include: [{ model: User }],
    })
    if (!team) return errorResponse(req, res, 'Project does not exist', 404)
    return successResponse(req, res, {})
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const addTeam = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { name, description, members } = req.body
    const team = await Team.create(
      {
        id: uuidv4(),
        name,
        description,
      },
      { transaction }
    )
    for (const id of members) {
      const user = await User.findOne({ where: { id } })
      if (!user) throw new Error('Invalid User ID')
      await team.addUser(user, { transaction })
    }

    await transaction.commit()
    return successResponse(req, res, team)
  } catch (error) {
    await transaction.rollback()
    if (error.message === 'Invalid User ID')
      return errorResponse(req, res, error.message, 404)
    return errorResponse(req, res, error.message)
  }
}
export const updateTeamDetails = async (req, res) => {
  try {
    const { id } = req.params
    const { name, description } = req.body
    const team = await Team.findOne({ where: { id }, include: User })
    if (!team) return errorResponse(req, res, 'Team not found', 404)

    if (name) team.set('name', name)
    if (description) team.set('description', description)
    await team.save()
    return successResponse(req, res, team)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}
export const addTeamMembers = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { members } = req.body
    const team = await Team.findOne({ where: { id }, include: User })
    if (!team) return errorResponse(req, res, {})

    const newUsers = []
    for (const id of members) {
      const user = await User.findOne({ where: { id } })
      if (!user) throw new Error('Invalid User ID')
      newUsers.push({ ...user.dataValues })
      await team.addUser(user, { transaction })
    }

    await transaction.commit()
    return successResponse(req, res, {
      ...team.dataValues,
      users: [...team.dataValues.users, ...newUsers],
    })
  } catch (error) {
    await transaction.rollback()
    if (error.message === 'Invalid User ID')
      return errorResponse(req, res, error.message, 404)
    return errorResponse(req, res, error.message)
  }
}
export const removeTeamMembers = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.params
    const { members } = req.body
    const team = await Team.findOne({ where: { id }, include: User })
    if (!team) return errorResponse(req, res, {})

    for (const id of members) {
      const user = await User.findOne({ where: { id } })
      if (!user) throw new Error('Invalid User ID')
      await team.removeUser(user, { transaction })
    }
    const updatedUserList = team.dataValues.users.filter(
      (user) => members.indexOf(user.id) === -1
    )
    await transaction.commit()
    return successResponse(req, res, {
      ...team.dataValues,
      users: updatedUserList,
    })
  } catch (error) {
    await transaction.rollback()
    if (error.message === 'Invalid User ID')
      return errorResponse(req, res, error.message, 404)
    return errorResponse(req, res, error.message)
  }
}

export const removeTeam = async (req, res) => {
  try {
    const { id } = req.params
    const team = await Team.findOne({ where: { id } })
    if (!team) return errorResponse(req, res, 'Invalid Team ID', 404)
    await team.destroy()
    return successResponse(req, res, 'Successfully deleted team')
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}
