const { v4: uuidv4 } = require('uuid')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: uuidv4(),
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  })
  User.associate = function (models) {
    User.belongsToMany(models.teams, { through: 'user_teams' })
    User.Tasks = User.hasMany(models.tasks)

    User.hasOne(models.refreshTokens, {
      foreignKey: 'userId',
      targetKey: 'id',
    })
  }
  return User
}
