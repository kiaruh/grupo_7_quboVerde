//Express
const express = require('express');
const router = express.Router()

//Controller require
const controller = require('../controllers/userController');

//Route
router.get("/register", controller.register);
router.get("/login", controller.login);

module.exports = router;