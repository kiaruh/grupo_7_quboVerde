'use strict';

const productosDesdeJson = require("../../models/productModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkInsert('products', productosDesdeJson.all(), {});
    console.log(productosDesdeJson.all());
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('products', null, {});
     
  }
};