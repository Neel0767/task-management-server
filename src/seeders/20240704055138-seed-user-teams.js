'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user_teams',
      [
        {
          userId: 'd290f1ee-6c54-4b01-90e6-d701748f0854', // User 1
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0851', // Team Alpha
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'd290f1ee-6c54-4b01-90e6-d701748f0855', // User 2
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0851', // Team Alpha
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'd290f1ee-6c54-4b01-90e6-d701748f0856', // User 3
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0852', // Team Beta
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'd290f1ee-6c54-4b01-90e6-d701748f0857', // User 4
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0853', // Team Gamma
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 'd290f1ee-6c54-4b01-90e6-d701748f0858', // User 5
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0853', // Team Gamma
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_teams', null, {})
  },
}
