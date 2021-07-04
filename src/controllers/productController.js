const express = require('express');
const product = require("../models/productModel")
const imgController = require('../models/imgModel')
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
        let list = product.all();
        let lastIndex = list.length - 1;

        let newProductId = list[lastIndex].id + 1;

        let newProductDif = Math.round((parseFloat(req.body.riego) + parseFloat(req.body.luz))/2);

        let descripcion = req.body.descripcion;
        let newImg;

        if (req.body.img == ""){
            req.body.img = "null.jpg"
        }

        if (req.body.descripcion == ""){
            req.body.descripcion = "Producto sin descripción."
        }

        if (req.file){
            newImg = req.file.filename;
        } else {
            newImg = "default.jpg"
        }

        let newProduct = {
            id: newProductId,
            price: req.body.precio,
            name: req.body.producto,
            img: newImg,
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

        let modIndex = list.findIndex(prod => prod.id == setId);
        let modImg;

        let setProductDif = Math.round((parseFloat(req.body.riego) + parseFloat(req.body.luz))/2);

        // verifica si cambio la imagen, si cambio elimina la anterior y carga la nueva en el json, si no cambio pone en el json la imagen que ya estaba.
        if (req.body.img == undefined){  
            modImg = list[modIndex].img;
        } else {
            imgController.deleteImg(list[modIndex].img);
            modImg = req.file.filename;
        }

        let setMod = {
            id: setId,
            price: String(req.body.precio),
            name: req.body.producto,
            img: modImg,
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
    },

    delProd: function(req, res){
        let setId = req.params.id;
        let list = product.all();

        let delIndex = list.findIndex(prod => prod.id == setId)
        let deleteImg = list[delIndex].img;

        imgController.deleteImg(deleteImg);
        product.delete(setId);

        res.redirect("/products/all");

        console.log(deleteImg);
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
