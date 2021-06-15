//Express
const express = require('express');
const router = express.Router()

//Controller require
const controller = require('../controllers/productController');


router.get("/detail", controller.detail);


module.exports = router;
