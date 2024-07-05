'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable(
        'user_teams',
        {
          userId: {
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
              model: 'users',
              key: 'id',
            },
            onDelete: 'CASCADE',
          },
          teamId: {
            type: Sequelize.STRING,
            primaryKey: true,
            references: {
              model: 'teams',
              key: 'id',
            },
            onDelete: 'CASCADE',
          },
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
        },
        { transaction }
      )

      // Add foreign key to tasks table for the relationship with projects
      await queryInterface.addColumn(
        'tasks',
        'projectId',
        {
          type: Sequelize.UUID,
          references: {
            model: 'projects',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        { transaction }
      )

      // Add foreign key to tasks table for the relationship with users
      await queryInterface.addColumn(
        'tasks',
        'userId',
        {
          type: Sequelize.UUID,
          references: {
            model: 'users',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        { transaction }
      )

      // Add foreign key to projects table for the relationship with teams
      await queryInterface.addColumn(
        'projects',
        'teamId',
        {
          type: Sequelize.STRING,
          references: {
            model: 'teams',
            key: 'id',
          },
          onDelete: 'SET NULL',
        },
        { transaction }
      )
      // Add relation between user and refreshToken tables
      await queryInterface.addColumn(
        'refreshTokens',
        'userId',
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        { transaction }
      )
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('projects', 'teamId', { transaction })
      await queryInterface.removeColumn('tasks', 'userId', {
        transaction,
      })
      await queryInterface.removeColumn('refreshTokens', 'userId', {
        transaction,
      })
      await queryInterface.removeColumn('tasks', 'projectId', { transaction })
      await queryInterface.dropTable('user_teams', { transaction })

      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },
}
