const path = require('path'); 
const fs = require('fs');

const model = {
    all: function(){
        const directory = path.resolve(__dirname,"../data","productos.json");
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
}

module.exports = model;
