const config = require('../config/auth')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, Sequelize) => {
  const RefreshToken = sequelize.define('refreshTokens', {
    token: {
      type: Sequelize.TEXT,
    },
    expiryDate: {
      type: Sequelize.DATE,
    },
  })

  RefreshToken.createToken = async function (user) {
    let expiredAt = new Date()

    expiredAt.setSeconds(
      expiredAt.getSeconds() + process.env.JWT_REFRESH_EXPIRY
    )

    let _token = jwt.sign(
      {
        user: {
          userId: user.id,
          email: user.email,
        },
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    )

    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    })

    return refreshToken.token
  }

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime()
  }

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.users, {
      foreignKey: 'userId',
      targetKey: 'id',
    })
  }
  return RefreshToken
}
