import {
  projects as Project,
  teams as Team,
  tasks as Task,
  users as User,
  sequelize,
} from '../../models'
import { v4 as uuidv4 } from 'uuid'

import { successResponse, errorResponse } from '../../helpers'

export const listUserTasks = async (req, res) => {
  try {
    const { userId } = req.user
    const tasks = await Task.findAll({ where: { userId } })
    return successResponse(req, res, tasks)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const viewTaskById = async (req, res) => {
  try {
    const { id } = req.params
    const project = await Task.findOne({
      where: { id },
      include: [{ model: Project }, { model: User }],
    })
    if (!project) return errorResponse(req, res, 'Invalid Task ID', 404)
    return successResponse(req, res, project)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const addTask = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { userId } = req.user
    const { title, description, projectId } = req.body
    const task = await Task.create(
      {
        id: uuidv4(),
        title,
        description,
      },
      { transaction }
    )
    let user, project
    if (userId) {
      user = await User.findOne({ where: { id: userId } })
      if (!user) return errorResponse(req, res, 'Invalid User ID', 404)
      task.set('userId', userId)
    }
    if (projectId) {
      project = await Project.findOne({ where: { id: projectId } })
      if (!project) return errorResponse(req, res, 'Invalid Project ID', 404)
      task.set('projectId', projectId)
    }
    await task.save({ transaction })

    await transaction.commit()
    const taskAssociated = {
      ...task.toJSON(),
      user: user,
      project: project,
    }

    return successResponse(req, res, taskAssociated)
  } catch (error) {
    await transaction.rollback()
    return errorResponse(req, res, error.message)
  }
}

export const updateTaskDetails = async (req, res) => {
  try {
    const { id } = req.params
    const { title, description, status, projectId, userId } = req.body

    const task = await Task.findOne({ where: { id } })
    if (title) task.set('title', title)
    if (description) task.set('description', description)
    if (status) task.set('status', status)
    if (projectId !== undefined) {
      const project = await Project({ where: { id } })
      if (!project) return errorResponse(req, res, 'Invalid Project ID', 404)
      task.set('projectId', projectId || null)
    }
    if (userId !== undefined) {
      const user = await User.findOne({ where: { id } })
      if (!user) return errorResponse(req, res, 'Invalid User ID', 404)
      task.set('userId', userId || null)
    }
    await task.save()
    return successResponse(req, res, {})
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const removeTask = async (req, res) => {
  try {
    const { id } = req.params
    const task = await task.findOne({ where: { id } })
    if (!task) {
      return errorResponse(req, res, 'Invalid Task ID', 404)
    }
    await task.destroy()
    return successResponse(req, res, 'Task deleted successfully')
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}
