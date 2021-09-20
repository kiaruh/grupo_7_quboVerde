const express = require('express');
const router = express.Router();

const controller = require('../controllers/apiController');

router.get("/users", controller.users); // ruta usuarios
// espacio ruta paginado
router.get("/users/:id", controller.userDetail); // ruta detalle usuario

router.get("/products", controller.products); // ruta productos
// espacio ruta paginado
router.get("/products/:id", controller.productDetail); // ruta detalle productos


module.exports = router;