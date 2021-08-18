const path = require('path'); 
const fs = require('fs');

const directory = path.resolve(__dirname,"../data","productos.json");

const model = {
    all: function(){
        
        const file = fs.readFileSync(directory,"utf-8");
        const convert = JSON.parse(file);
        return convert
    },
    petfriendly: function(){
        let productos = this.all();
        let filter = productos.filter(producto => producto.pet==true)
        return filter
    },
    productbyid: function(id){
        let productos = this.all();
        let productDetail = [];
        let filter = productos.find(productDetail=>productDetail.id==id)
        productDetail.push(filter);
        return productDetail;
    },

    add: function(data){
        let productos = this.all();
        productos.push(data);

        let productosNuevo = JSON.stringify(productos,null,2);
        fs.writeFileSync(directory, productosNuevo);
    },

    delete: function(id){
        let list = this.all();
        let deleteIndex = list.findIndex(prod => prod.id == id)

        list.splice(deleteIndex, 1);
        let productosEliminado = JSON.stringify(list,null,2);
        fs.writeFileSync(directory, productosEliminado);
        
    },

    mod: function(id, data){
        let allProd = this.all();
        let modIndex = id;

        allProd[modIndex] = data;

        let modProdJson = JSON.stringify(allProd,null,2);
        fs.writeFileSync(directory, modProdJson);
    },

    listByField: function(field, value){
        let productos = this.all();
        let filter = productos.filter(producto => producto[field] === value)
        return filter
    },

    listByRelative: function(field, value){
        let productos = this.all();
        let filter = productos.filter(producto => producto[field] <= value)
        return filter
    },

    imgList: function (){
        let productos = this.all();

        let respuesta = [];
        for (let i=0; i<productos.length; i++){
            let content = JSON.stringify(Array(productos[i].img))
            let result = {image: content}
            respuesta.push(result);
        }
        
        console.log(respuesta)
        return respuesta;
        
    },

    priceList: function (){
        let productos = this.all();

        let respuesta = [];
        for (let i=0; i<productos.length; i++){
            let content = Number(productos[i].price)
            let result = {price: content}
            respuesta.push(result);
        }
        
        console.log(respuesta)
        return respuesta;
        
    }


}



module.exports = model;
