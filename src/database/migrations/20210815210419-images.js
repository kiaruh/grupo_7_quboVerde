'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('images', {

        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        image: {
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
    await queryInterface.dropTable('images')   
  }
}
