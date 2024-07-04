import {
  projects as Project,
  teams as Team,
  tasks as Task,
  sequelize,
} from '../../models'
import { v4 as uuidv4 } from 'uuid'

import { successResponse, errorResponse } from '../../helpers'

export const viewAllProjects = async (req, res) => {
  try {
    const project = await Project.findAll({
      include: Team,
      attributes: {
        include: [
          [
            sequelize.literal(`(
            SELECT COUNT(*)
            FROM tasks
            WHERE tasks.projectId = projects.id
          )`),
            'taskCount',
          ],
        ],
      },
    })
    return successResponse(req, res, project)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const viewProjectById = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({
      where: { id },
      include: [{ model: Team }, { model: Task }],
    })
    if (!project) return errorResponse(req, res, 'Project does not exist', 404)
    return successResponse(req, res, project)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const addProject = async (req, res) => {
  try {
    const { title, description } = req.body
    const project = await Project.create({
      id: uuidv4(),
      title,
      description,
      teamId: req.body.teamId || null,
    })
    return successResponse(req, res, project)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}
export const updateProject = async (req, res) => {
  const { id } = req.params
  const { title, description, teamId } = req.body
  const payload = {}
  if (description === undefined) payload['description'] = description
  const project = await Project.findOne({ where: { id } })

  if (!project) return errorResponse(req, res, 'Project does not exist', 404)

  if (title) project.set('title', title)
  if (description) project.set('description', description)
  if (teamId) project.set('teamId', teamId)
  await project.save()

  try {
    return successResponse(req, res, { ...project.dataValues })
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const removeProject = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Project.findOne({ where: { id } })
    if (!project) {
      return errorResponse(req, res, 'Project not found', 404)
    }
    await project.destroy()
    return successResponse(req, res, { ...project.dataValues })
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}
