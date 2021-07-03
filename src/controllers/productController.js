const express = require('express');
const product = require("../models/productModel")
const path = require('path'); 
const fs = require('fs');

const productController = {
    list: (req,res) => res.render("products/all",{catalogo:product.all()}),
    detail: (req,res) => res.render("products/detail",{catalogo:product.productbyid(req.params.id)}),
    newprod: function(req,res){
        res.render("products/admin/product_new"); // get new product
    },

    modprod: function(req,res) {
        res.render("products/admin/product_mod"); // get product modification
    },

    addProd: function(req, res){
        let newProductId = product.all().length + 1;
        let newProductDif = Math.round((parseFloat(req.body.riego) + parseFloat(req.body.luz))/2);

        let descripcion = req.body.descripcion;

        if (req.body.img == ""){
            req.body.img = "null.jpg"
        }

        if (req.body.descripcion == ""){
            req.body.descripcion = "Producto sin descripción."
        }

        let newProduct = {
            id: newProductId,
            price: String(req.body.precio),
            name: req.body.producto,
            img: req.file.filename,
            species: req.body.especie,
            scale: req.body.escala,
            irr: req.body.riego,
            light: req.body.luz,
            pet: req.body.aptomascotas,
            dif: newProductDif,
            desc: descripcion,
        }

        product.add(newProduct);
        res.redirect("/products/all");
    },

    mDetail: function(req, res){
        let detId = req.params.id;

        let list = product.all();

        let detIndex = list.findIndex(prod => prod.id == detId)

        let datos = list[detIndex];


        res.render ("products/admin/product_mod", {datos: datos});
        console.log(datos);
    },

    setProd: function(req, res){
        let setId = req.params.id;
        let list = product.all();
        

        let modIndex = list.findIndex(prod => prod.id == setId)

        let setProductDif = Math.round((parseFloat(req.body.riego) + parseFloat(req.body.luz))/2);
       
        let setMod = {
            id: setId,
            price: String(req.body.precio),
            name: req.body.producto,
            img: req.file.filename,
            species: req.body.especie,
            scale: req.body.escala,
            irr: req.body.riego,
            light: req.body.luz,
            pet: req.body.aptomascotas,
            dif: setProductDif,
            desc: req.body.descripcion,
        }

        product.mod(modIndex, setMod);
        res.redirect("/products/all");
        console.log(setMod);
    },

    delProd: function(req, res){
        let setId = req.params.id;
        product.delete(setId);

        res.redirect("/products/all");
    },

    searchProd: function (req, res){
        let search = req.query.search.toLowerCase();
        let data = product.all();

        // arma el array vacio de respuesta
        let query = [];

        // arma el loop que busca las respuestas. Pordria ser un forEach, pero lo arme asi para ir toqueteando.

        for (let i=0; i < data.length; i++) {
            if (data[i].name.toLowerCase().includes(search)){
                query.push(data[i]);
            }
        }

        res.render("products/searchresult",{catalogo: query, search: search})
        console.log(query);

    }
}

module.exports = productController;
