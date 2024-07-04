'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'projects',
      [
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0861',
          title: 'Project A',
          description: 'Description for Project A',
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0851', // Assign to Team Alpha
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0862',
          title: 'Project B',
          description: 'Description for Project B',
          teamId: 'd290f1ee-6c54-4b01-90e6-d701748f0851', // Assign to Team Alpha
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0863',
          title: 'Project C',
          description: 'Description for Project C',
          teamId: null, // No team assigned
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projects', null, {})
  },
}
