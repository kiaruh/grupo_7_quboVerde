'use strict';

const productosDesdeJson = require("../../models/productModel")

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
  await queryInterface.bulkInsert('images', productosDesdeJson.imgList(), {});
    console.log(productosDesdeJson.imgList());
  },

  down: async (queryInterface, Sequelize) => {
   
     await queryInterface.bulkDelete('images', null, {});
     
  }
};