'use strict';

const productosDesdeJson = require("../../models/productModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
  await queryInterface.bulkInsert('price', productosDesdeJson.priceList(), {});
    console.log(productosDesdeJson.priceList());
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('price', null, {});
     
  }
};