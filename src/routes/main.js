const express = require('express');
const router = express.Router()

const controller = require('../controllers/mainController');

router.get("/", controller.index); // get home
router.get("/error", controller.error); // get home
router.get("/intro", controller.intro);


module.exports = router;