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
        if (img == "default_profile.png" || img =="avatar1.png" || img =="avatar2.png"|| img =="avatar3.png"
        || img =="avatar4.png"|| img =="avatar5.png"|| img =="avatar6.png"|| img =="avatar7.png"|| img =="avatar8.png"|| img =="avatar9.png"){
            return true
        } else {
        let imgToDelete = path.resolve(directoryAvatar, img);
        console.log (imgToDelete);
        fs.unlink(imgToDelete, () => console.log("borrando " + img));
        }
    }
}

module.exports = model;
