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
    deleteImgAvatar: function(img){
        if (img == "default_profile.png" || "avatar1.png" || "avatar2.png"|| "avatar3.png"
        || "avatar4.png"|| "avatar5.png"|| "avatar6.png"|| "avatar7.png"|| "avatar8.png"|| "avatar9.png"){
            return true
        } else {
        let imgToDelete = path.resolve(directoryAvatar, img);
        console.log (imgToDelete);
        fs.unlink(imgToDelete, () => console.log("borrando " + img));
        }
    }
}

module.exports = model;
