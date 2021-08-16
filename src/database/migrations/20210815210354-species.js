'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('species', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        specie: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        }
  })
} catch (error){
  throw error;
}
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('species')   
  }
}
