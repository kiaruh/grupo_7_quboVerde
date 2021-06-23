const express = require('express');
const product = require("../models/productModel")

const mainController = {
    index: (req,res) => res.render("home",{catalogo:product.all()}),
    // pet: (req,res) => res.render("home",{catalogo:product.petfriendly()}),
    // index: (req,res) => res.send(product.all()),
    // index: (req,res) => res.render("home"), // get home
    error: (req,res) => res.render("error"), // get error
}

module.exports = mainController;