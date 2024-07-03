'use strict'
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define(
    'teams',
    {
      id: {
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {}
  )
  Team.associate = function (models) {
    // associations can be defined here
    Team.belongsToMany(models.users, { through: 'user_teams' })
    Team.Projects = Team.hasMany(models.projects)
  }
  return Team
}
