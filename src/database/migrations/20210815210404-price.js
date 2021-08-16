'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('price', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },

        discount: {
          type: Sequelize.INTEGER,
          allowNull: true,
        }
  })
} catch (error){
  throw error;
}
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('price')   
  }
}

