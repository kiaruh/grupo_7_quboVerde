//Express
const express = require('express');
const router = express.Router();
const path = require('path');

// requiero Multer
const multer = require('multer');

//Controller require
const controller = require('../controllers/productController');

// configuracion de multer

const mds = multer.diskStorage({
    destination: (req, file, callback) => {
        let prodFolder = path.resolve(__dirname, '../', '../public', 'img', 'img_products');
        callback(null, prodFolder);
    },
    filename: (req, file, callback) => {
        let prodName = req.body.producto;
        let nameToSave = prodName.replace(/ /g, "_");
        let imgName = nameToSave + "-" + Date.now() + path.extname(file.originalname);
        callback(null,imgName);
    }
});

const fileUpload = multer({storage: mds});

router.get("/all", controller.list);
router.get("/detail/:id", controller.detail);

// rutas para agregar producto
router.get("/newprod", controller.newprod);
router.post("/new", fileUpload.single('img'), controller.addProd);

// rutas para modificar producto
router.get("/mod/:id", controller.mDetail);
router.put("/mod/:id", fileUpload.single('img'), controller.setProd);

// ruta para eliminar el producto desde edit
router.delete("/mod/del/:id", controller.delProd);

// ruta para search
router.post("/search/", controller.searchProd);


module.exports = router;
