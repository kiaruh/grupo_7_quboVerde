'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('user_directions', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        user_ID: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        street: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        number: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        dp: {
          type: Sequelize.STRING,
          allowNull: true,
        },

        city: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        zipcode: {
          type: Sequelize.INTEGER,
          allowNull: false,
        }
  })
} catch (error){
  throw error;
}
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users_directions')   
  }
}
