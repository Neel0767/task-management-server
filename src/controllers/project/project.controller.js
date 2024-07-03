import {
  users as User,
  projects as Project,
  teams as Team,
  tasks as Task,
  sequelize,
} from '../../models'
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
    return successResponse(req, res, project)
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const addProject = async (req, res) => {
  const { refreshToken: requestToken } = req.body

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    })

    if (!refreshToken) {
      res.status(403).json({ message: 'Invalida Refresh token' })
      return
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } })

      res.status(403).json({
        message: 'Refresh token was expired. Please make a new login request',
      })
      return
    }

    const user = await refreshToken.getUser()
    let newAccessToken = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    )

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}
export const updateProject = async (req, res) => {
  const { refreshToken: requestToken } = req.body

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    })

    if (!refreshToken) {
      res.status(403).json({ message: 'Invalida Refresh token' })
      return
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } })

      res.status(403).json({
        message: 'Refresh token was expired. Please make a new login request',
      })
      return
    }

    const user = await refreshToken.getUser()
    let newAccessToken = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    )

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}

export const removeProject = async (req, res) => {}
