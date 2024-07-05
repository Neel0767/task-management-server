'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('refreshTokens', {
      token: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: false,
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
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('refreshTokens')
  },
}
