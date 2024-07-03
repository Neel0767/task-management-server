'use strict'
const { v4: uuid4 } = require('uuid')

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuidv4(),
          name: 'John Doe',
          email: 'johndoe@gmail.com',
          password: '827ccb0eea8a706c4c34a16891f84e7b',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more dummy users as needed
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return (queryInterface, Sequelize) => {
      queryInterface.bulkDelete('users', null, {})
    }
  },
}
