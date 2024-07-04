'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'teams',
      [
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
          name: 'Team Alpha',
          description: 'Alpha team description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0852',
          name: 'Team Beta',
          description: 'Beta team description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0853',
          name: 'Team Gamma',
          description: 'Gamma team description',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('teams', null, {})
  },
}
