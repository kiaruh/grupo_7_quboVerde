'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('products', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },

        specie_id: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        price_id: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        des: {
          type: Sequelize.TEXT,
          alowNull: false
        },

        irr: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        light: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        scale: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        pet: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        diff: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        img_id: {
          type: Sequelize.TEXT, // por las dudas que la cadena sea larga
          alowNull: false
        }

      });

    } catch (error){
      console.log(error);
    }
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');       
}
}
