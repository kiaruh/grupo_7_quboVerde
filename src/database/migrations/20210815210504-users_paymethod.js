'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('user_paymethod', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },

        user_ID: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
  })
  
} catch (error){
  throw error;
}
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_paymethod')   
  }
}