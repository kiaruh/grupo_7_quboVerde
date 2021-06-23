//Express
const express = require('express');
const router = express.Router()

//Controller require
const controller = require('../controllers/productController');

router.get("/all", controller.list);
router.get("/detail/:id", controller.detail);
router.get("/newprod", controller.newprod);
router.get("/mod", controller.modprod);


module.exports = router;
