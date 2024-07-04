'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      // Create user_teams join table for the many-to-many relationship between users and teams
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
            defaultValue: Sequelize.fn('NOW'),
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'),
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
      transaction.commit()
    } catch (err) {
      transaction.rollback()
    }
  },

  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('projects', 'teamId', { transaction })
      await queryInterface.removeColumn('tasks', 'assignedUserId', {
        transaction,
      })
      await queryInterface.removeColumn('tasks', 'projectId', { transaction })
      await queryInterface.dropTable('user_teams', { transaction })

      transaction.commit()
    } catch (err) {
      transaction.rollback()
      throw err
    }
  },
}
