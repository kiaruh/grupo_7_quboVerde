'use strict';

const usuariosDesdeJson = require("../../models/userModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('users', usuariosDesdeJson.findAll(), {});
    console.log(usuariosDesdeJson.findAll());
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('users', null, {});
     
  }
};
