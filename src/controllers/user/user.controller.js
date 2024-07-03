import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import { users as User, refreshTokens as RefreshToken } from '../../models'
import { successResponse, errorResponse } from '../../helpers'

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body

    const user = await User.findOne({
      where: { email },
    })
    if (user) {
      throw new Error('User already exists with same email')
    }
    const reqPass = crypto.createHash('md5').update(password).digest('hex')
    const payload = {
      email,
      name,
      password: reqPass,
    }

    const newUser = await User.create(payload)
    const accessToken = jwt.sign(
      {
        user: {
          userId: newUser.id,
          email: newUser.email,
          createdAt: new Date(),
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: `${process.env.JWT_EXPIRY}s`,
      }
    )
    let refreshToken = await RefreshToken.createToken(newUser)
    delete newUser.dataValues.password
    return successResponse(req, res, {
      accessToken,
      refreshToken,
    })
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    })
    if (!user) {
      throw new Error('Incorrect Email Id/Password')
    }
    const reqPass = crypto
      .createHash('md5')
      .update(req.body.password || '')
      .digest('hex')
    if (reqPass !== user.password) {
      throw new Error('Incorrect Email Id/Password')
    }

    const accessToken = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: `${process.env.JWT_EXPIRY}s`,
      }
    )

    let refreshToken = await RefreshToken.createToken(user)

    delete user.dataValues.password
    return successResponse(req, res, {
      accessToken,
      refreshToken,
    })
  } catch (error) {
    return errorResponse(req, res, error.message)
  }
}

export const refreshToken = async (req, res) => {
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
