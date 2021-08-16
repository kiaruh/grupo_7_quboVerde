'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {

      await queryInterface.createTable('users', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },

        email: {
          type: Sequelize.STRING,
          alowNull: false,
          unique: true
        },

        password: {
          type: Sequelize.INTEGER,
          alowNull: false
        },

        bday: {
          type: Sequelize.DATEONLY,
          alowNull: false
        },

        avatar: {
          type: Sequelize.STRING,
          alowNull: true,
        },

        send_ID: { // puede no tener una direccion ingresada
          type: Sequelize.INTEGER,
          alowNull: true
        },

        pm_ID: { // puede no tener un medio de pago ingresado
          type: Sequelize.INTEGER,
          alowNull: true
        }

      });

    } catch (error){
      console.log(error);
    }
   
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');       
}
}
