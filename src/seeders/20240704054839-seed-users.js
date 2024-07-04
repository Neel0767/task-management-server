'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0854', // optional if using UUID or auto increment
          name: 'John Doe',
          email: 'john.doe@example.com',
          password: '827ccb0eea8a706c4c34a16891f84e7b', // You should hash passwords in a real application
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0855', // optional if using UUID or auto increment
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
          password: '827ccb0eea8a706c4c34a16891f84e7b', // You should hash passwords in a real application
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0856', // optional if using UUID or auto increment
          name: 'Alice Smith',
          email: 'alice.smith@example.com',
          password: '827ccb0eea8a706c4c34a16891f84e7b', // You should hash passwords in a real application
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0857', // optional if using UUID or auto increment
          name: 'Bob Brown',
          email: 'bob.brown@example.com',
          password: '827ccb0eea8a706c4c34a16891f84e7b', // You should hash passwords in a real application
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 'd290f1ee-6c54-4b01-90e6-d701748f0858', // optional if using UUID or auto increment
          name: 'Charlie Davis',
          email: 'charlie.davis@example.com',
          password: '827ccb0eea8a706c4c34a16891f84e7b', // You should hash passwords in a real application
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  },
}
