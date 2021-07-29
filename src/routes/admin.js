const express = require('express');
const router = express.Router()

const controller = require('../controllers/adminController');

router.get("/panel", controller.menu); // get panel


module.exports = router;