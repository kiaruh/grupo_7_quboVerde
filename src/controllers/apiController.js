const express = require('express');
const product = require("../models/productModel") //Product mayuscula 

const db = require('../database/models');
const Op = db.Sequelize.Op;

const apiController = {

    users: async function (req,res){

        // sobre el listado: la asociacion precios e imagenes es 1 a 1, vinculada directamente en PK, la de especies no
        // y las imagenes van hacia la vista como un string, y en la vista se convierten en un array.

        try {

        let listaUsuarios = await db.User.findAll();
        
        var listaUsuariosApi = listaUsuarios.map(function(obj){
            var r = {};
            r.id = obj.id;
            r.user= obj.user;
            r.email = obj.email;
            r.detail = req.protocol + "://" + req.get('host') + req.originalUrl + "/" + obj.id
            return r
        })

        res.status(200).json(
            {
                count: listaUsuarios.length,
                users: listaUsuariosApi,
                status: 200
            }
        )
        
        }catch(e){
            console.log("ERRORR!!!");
            console.log(e)
        }
    },

    userDetail: async function (req,res) { 

        try {
         let user = await db.User.findByPk(req.params.id);

       let detalleUsuarioApi = {
                id: user.id,
                user: user.user,
                firstname: user.firstname,
                lastname: user.lastname,
                bday: user.bday,
                email: user.email,
                img: req.protocol + "://" + req.get('host') + "/img/upload/avatar/" + user.avatar
            }


            res.status(200).json(
                {
                    users: detalleUsuarioApi,
                    status: 200
                }
            )

        }catch(e){
            throw error;
        }  
    },

    products: async function (req, res){

        try{
        let listaProductos = await db.Product.findAll({
            include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
        })

        var productsApi = listaProductos.map(function(obj){
            var r = {};
            
            r.id = obj.id;
            r.name= obj.name;
            r.especie = obj.especies.specie;
            r.des = obj.des;
            r.pet = obj.pet;
            r.diff = obj.diff;
            r.detail = req.protocol + "://" + req.get('host') + req.originalUrl + obj.id

            return r
        })

        let petCounter = 0;
        let e1c = 0;
        let e2c = 0;
        let e3c = 0;
        let e4c = 0;
        let easyCounter = 0;
        let poca = 0;
        let algo = 0;
        let capo = 0;

        listaProductos.forEach(function(elemento) {
            if (elemento.pet == 1){
                petCounter = petCounter + 1
            }

            if (elemento.especies.id == 1){
                e1c = e1c + 1
            }

            if (elemento.especies.id == 2){
                e2c = e2c + 1
            }

            if (elemento.especies.id == 3){
                e3c = e3c + 1
            }

            if (elemento.especies.id == 4){
                e4c = e4c + 1
            }

            if (elemento.diff <= 2){
                easyCounter = easyCounter +1;
            }

            if (elemento.diff == 3){
                poca = poca +1;
            }

            if (elemento.diff == 4){
                algo = algo +1;
            }

            if (elemento.diff == 5){
                capo = capo +1;
            }

        })

        console.log(petCounter);

        res.status(200).json(
            {
                count: listaProductos.length,
                countByCategory: {
                    petFriendly: petCounter,
                    ficus: e1c,
                    dracanea: e2c,
                    philosum: e3c,
                    aloe: e4c,
                    easymode: easyCounter,
                    poca: poca,
                    algo: algo,
                    capo: capo
                },
                products: productsApi,
                status: 200
            }
        )
       
        } catch(e){
            console.log("fallo product en api")
            console.log(e);
        }

    },
    productDetail: async function (req,res) { 

        try {
            let detalleProducto = await db.Product.findByPk(req.params.id, {
                include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
            });

            let detalleImagen = JSON.parse(detalleProducto.imagenes.image);

       let detalleProductoApi = {
                id: detalleProducto.id,
                name: detalleProducto.name,
                specie: detalleProducto.especies.specie,
                price: detalleProducto.precios.price,
                des: detalleProducto.des,
                riego: detalleProducto.irr,
                luz: detalleProducto.light,
                escala: detalleProducto.scale,
                diff: detalleProducto.diff,
                img: req.protocol + "://" + req.get('host') + "/img/upload/product/" + detalleImagen
            }
        

            res.status(200).json(
                {
                    product: detalleProductoApi,
                    status: 200
                }
            )

        }catch(e){
            throw error;
        }  
    }
}

module.exports = apiController;
