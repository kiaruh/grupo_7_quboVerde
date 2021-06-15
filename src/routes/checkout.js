//Express
const express = require('express');
const router = express.Router()

//Controller require
const controller = require('../controllers/checkoutController');

router.get("/cart", controller.checkout);


module.exports = router;
