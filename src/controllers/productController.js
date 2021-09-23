const express = require('express');
const product = require("../models/productModel") //Product mayuscula 
const imgController = require('../models/imgModel')
const path = require('path'); 
const fs = require('fs');

// voy a comentar todas las cosas que cambie de este archivo para armarlo en DB, asi sabemos donde es el tema.
// requerir el modelo

const db = require('../database/models');
const Op = db.Sequelize.Op;

const productController = {

    list: async function (req,res){

        // sobre el listado: la asociacion precios e imagenes es 1 a 1, vinculada directamente en PK, la de especies no
        // y las imagenes van hacia la vista como un string, y en la vista se convierten en un array.

        try {

        let listaProductos = await db.Product.findAll({
            include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
        })

        res.render("products/all",{catalogo:listaProductos})
        
        
        }catch(e){
            console.log(e);
        }
    },

    detail: async function (req,res) { 

        try {

        // inclui la asociaciones en el findByPk (no sabia que se podia)
        // y las imagenes van hacia la vista como un string, y en la vista se convierten en un array.

            let detalleProducto = await db.Product.findByPk(req.params.id, {
                include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
            })

            res.render("products/detail",{catalogo:detalleProducto})

        }catch(e){
            throw error;
        }  
    },

    newprod: function(req,res){
        res.render("products/admin/product_new"); // get new product
    },

    modprod: function(req,res) {
        res.render("products/admin/product_mod"); // get product modification
    },

    modall: async function (req,res) {

        try {

            let listaProductos = await db.Product.findAll({
                include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
            })

            res.render("products/admin/all_mod",{catalogo: listaProductos})

        } catch(e){
            throw e
        }
        
    },

    addProd: async function(req, res){
        try {
        /* 
        // calculo del ultimo index, para agregar en el json

        let list = product.all();
        let lastIndex = list.length - 1;

        let newProductId = list[lastIndex].id + 1;
        */

        let newProductDif = Math.round((parseFloat(req.body.riego) + parseFloat(req.body.luz))/2);

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

        if (req.body.aptomascotas == "true"){
            req.body.aptomascotas = 1
        } else {
            req.body.aptomascotas = 0
        }

        /* 
        // armado del objeto a insertar en el json
        let newProduct = {
            id: Number(newProductId),
            price: Number(req.body.precio),
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

        */

        /* 
        // llama a al funcion que escribe el json
        product.add(newProduct);
        */

        
        // creo el producto en la tabla de productos
        await db.Product.create({
            name: req.body.producto,
            specie_id: req.body.especie,
            des: req.body.descripcion,
            irr: parseInt(req.body.riego),
            light: parseInt(req.body.luz),
            scale: parseInt(req.body.escala), 
            pet: parseInt(req.body.aptomascotas),
            diff: newProductDif 
        })

        // creo precio en la tabla de precios
        await db.Price.create({
            price: Number(req.body.precio) 
        })

        // creo la primer imagen en la tabla de imagenes
        // antes, como quiero meter un array en el campo con las imagenes, armo el array y lo transformo en un string
        let imagenesAGuardar = [];
        imagenesAGuardar.push(newImg);
        let dbimage = JSON.stringify(imagenesAGuardar);

        await db.Image.create({
            image: dbimage 
        })
       
        res.redirect("/products/mod");

        }catch(error){
            throw error;
        }
    },

    mDetail: async function(req, res){

        // busco con un findByPk que incluya las tablas cruzadas
        // y despues envio a la tabla de la misma manera que siempre

        try {
        let detalleProducto = await db.Product.findByPk(req.params.id, {
            include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
        })

        let todasLasEspecies = await db.Specie.findAll();
        
        res.render ("products/admin/product_mod", {datos: detalleProducto, especies: todasLasEspecies});
    
        }catch(e){
            throw error;
        } 

    },

    setProd: async function(req, res){

        // esta andando, lo que no resolvi todavia es el tema de gestion de las fotos cuando se eliminan

        try {
            let setId = req.params.id;


        let modProductDif = Math.round((parseFloat(req.body.riego) + parseFloat(req.body.luz))/2);

        await db.Product.update({
            name: req.body.producto,
            specie_id: req.body.especie,
            price_id: setId,
            img_id: setId,
            des: req.body.descripcion,
            irr: parseInt(req.body.riego),
            light: parseInt(req.body.luz),
            scale: parseInt(req.body.escala), 
            pet: parseInt(req.body.aptomascotas),
            diff: modProductDif 
        }, 
        {
            where: {id: setId}
        })

        
        await db.Price.update({
            price: Number(req.body.precio) 
        }, 
        {
            where: {id: setId}
        })

        // modificacion de imagenes lo comentado abajo es el tema de eliminar las imagenes no utilizadas, que tengo que checkearlo mejor...
        
        /*
        let modImg = JSON.parse(detalleProducto.imagenes.image);

    for (i=0; i>modImg.length; i++){

        if (req.file == undefined){  
            modImg = detalleProducto[].imagenes.image;
            console.log("undefined desde body");
        } else {
            imgController.deleteImg(list[modIndex].img);
            modImg = req.file.filename;
            console.log("valor desde body");
        }
    }
    */

        let newImg = req.file.filename;
        let imagenesAGuardar = [];
        imagenesAGuardar.push(newImg);
        let dbimage = JSON.stringify(imagenesAGuardar);

        await db.Image.update({
            image: dbimage 
        }, 
        {
        where: {id: setId}
        })

        res.redirect("/products/mod");

        } catch(e){
            throw e
        }
    },

    delProd: async function(req, res){

        // idem anterior, tengo que resolver el tema de eliminar las imagenes que no se usan.

        try {
            let setId = req.params.id;

            // elminado el producto
            await db.Product.destroy({
                where: {id: setId}
            })

            // eliminado el precio
            await db.Price.destroy({
                where: {id: setId}
            })

            // eliminada la ruta a las imagenes (no las imagenes aun)
            await db.Image.destroy({
                where: {id: setId}
            })

            res.redirect("/products/mod");

        } catch(e){
            throw e
        }
        
        /*
        let deleteImg = list[delIndex].img;

        imgController.deleteImg(deleteImg);
        product.delete(setId);
        */
    },

    searchProd: async function (req, res){
        const Op = db.Sequelize.Op;
        try {
            let search = req.query.search.toLowerCase();
            let query = await db.Product.findAll({
                where: {
                    name: {[Op.like]: '%' + search + '%'}
                },
                include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
            })

            res.render("products/searchresult",{catalogo: query, search: search})

        } catch(e){
            throw e
        }
    },

    pet: async function (req, res){

        try {
        let query = await db.Product.findAll({
            where: {
                pet: 1
            },
            include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
        })
        res.render("products/searchresult",{catalogo: query, search: "Productos Aptos para Mascotas"})

        }catch(e){
            throw e;
        }  
    },

    bestseller: function (req, res){
        // este todavia no lo arme, porque tiene mas logica armado desde el carrito.
        let list = product.listByRelative("price", 1000);
        res.render("products/searchresult",{catalogo: list, search: "Los más vendidos!"});

    },

    easymode: async function (req, res){

        const Op = db.Sequelize.Op;
        // el easymode sigue siendo dificultades hasta dos (1 y 2 inclusive). Si queremos poner hasta 3 modificamos en OP.lte a 3.

        try {
            let query = await db.Product.findAll({
                where: {
                    diff: {[Op.lte]: 2},
                },
                include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
            })

            res.render("products/searchresult",{catalogo: query, search: "Plantas fáciles de mantener (easymode!)"})

        } catch(e){
            throw e
        }
    },

    priceList: async function (req, res){
        // esta funcion manda a la vista el listado de precios
        try{

            let listadoPrecios = await db.Price.findAll({
                include: [{association: 'productos'}]
            });

            res.render("products/admin/product_price_list",{precios: listadoPrecios})

        }catch(e){
            throw e
        }
    },

    priceSet: async function(req, res){
        console.log("entro")
        console.log(req.body)
        
        try{

            await db.Price.update({
                price: req.body.precioNuevo,
                discount: req.body.descuentoNuevo
            },
            {where: {id:req.body.aModificar}}
            )

            let listadoPrecios = await db.Price.findAll({
                include: [{association: 'productos'}]
            });

            res.render("products/admin/product_price_list",{precios: listadoPrecios})

        }catch(e){
            throw e
        }

    }
}

module.exports = productController;
