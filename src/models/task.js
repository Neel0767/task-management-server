'use strict'
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'tasks',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'overdue'),
        defaultValue: 'pending',
      },
    },
    {}
  )
  Task.associate = function (models) {
    // associations can be defined here
    Task.Project = Task.belongsTo(models.projects)
    Task.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
    })
  }
  return Task
}
