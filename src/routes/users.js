//Express
const express = require('express');
const router = express.Router()

//Controller require
const controller = require('../controllers/userController');

//Route
router.get("/register", controller.register);
router.get("/login", controller.login);
router.get("/newprod", controller.newprod);
router.get("/mod", controller.modprod);

module.exports = router;