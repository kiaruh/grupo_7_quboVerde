const express = require('express-fetch');
const router = express.Router();

const controller = require('../controllers/dataController');

router.get('/', controller.list);

module.exports = router;
