const path = require('path'); 
const fs = require('fs');

const directoryProd = path.resolve(__dirname, "../" , "../public", "img", "upload", "product");
const directoryAvatar = path.resolve(__dirname, "../" , "../public", "img", "upload", "avatar");

const model = {
    deleteImg: function(img){
        if (img == "default.jpg"){
            
        } else {

        let imgToDelete = path.resolve(directoryProd, img);
        console.log (imgToDelete);
        fs.unlink(imgToDelete, () => console.log("borrando " + img));
        }
    },
    deleteImgAvtar: function(img){
        if (img == "default_profile.png"){
            
        } else {

        let imgToDelete = path.resolve(directoryAvatar, img);
        console.log (imgToDelete);
        fs.unlink(imgToDelete, () => console.log("borrando " + img));
        }
    }
}

module.exports = model;
