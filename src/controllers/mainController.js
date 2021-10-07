const express = require('express');
const product = require("../models/productModel")

const db = require('../database/models');

const mainController = {
    
    index: async function (req,res) { 
        
        try {

            let listaProductos = await db.Product.findAll({
                include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
            })
    
            res.render("home",{catalogo:listaProductos})
            }catch(e){
                console.log(e);
            }
},
    // pet: (req,res) => res.render("home",{catalogo:product.petfriendly()}),
    // index: (req,res) => res.send(product.all()),
    // index: (req,res) => res.render("home"), // get home
    error: (req,res) => res.render("error"), // get error
    intro: (req,res) => res.render("intro") // get error

}

module.exports = mainController;