const express = require('express');
const product = require("../models/productModel")
const path = require('path'); 
const fs = require('fs');

const productController = {
    list: (req,res) => res.render("products/all",{catalogo:product.all()}),
    detail: (req,res) => res.render("products/detail",{catalogo:product.productbyid(req.params.id)}),
    newprod: (req,res) => res.render("products/admin/product_new"), // get new product
    modprod: (req,res) => res.render("products/admin/product_mod"), // get product modification
    listado: function(){},
    crear: function(){},
}

module.exports = productController;
