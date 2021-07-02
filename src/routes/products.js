//Express
const express = require('express');
const router = express.Router()

//Controller require
const controller = require('../controllers/productController');

router.get("/all", controller.list);
router.get("/detail/:id", controller.detail);

// rutas para agregar producto
router.get("/newprod", controller.newprod);
router.post("/new", controller.addProd);

// rutas para modificar producto
router.get("/mod/:id", controller.mDetail);
router.put("/mod/:id", controller.setProd);

// ruta para eliminar el producto desde edit
router.delete("/mod/del/:id", controller.delProd);


module.exports = router;
