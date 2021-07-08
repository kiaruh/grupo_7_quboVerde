const path = require('path'); 
const fs = require('fs');

const directory = path.resolve(__dirname, "../" , "../public", "img", "upload", "product");

const model = {
    deleteImg: function(img){
        if (img == "default.jpg"){
            
        } else {

        let imgToDelete = path.resolve(directory, img);
        console.log (imgToDelete);
        fs.unlink(imgToDelete, () => console.log("borrando " + img));
        }
    }
}

module.exports = model;
