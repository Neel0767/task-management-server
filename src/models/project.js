'use strict'
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'projects',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: DataTypes.STRING,
      desc: DataTypes.STRING,
    },
    {}
  )
  Project.associate = function (models) {
    // associations can be defined here
    Project.Tasks = Project.hasMany(models.tasks)
    Project.Team = Project.belongsTo(models.teams)
  }
  return Project
}
