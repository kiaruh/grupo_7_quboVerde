//Express
const express = require('express')
const router = express.Router()

//Controller require
const controller = require('../controllers/userController')

//Middlewares
const validations = require('../middlewares/validationRegisterMiddleware')




//Route
router.get("/register", controller.register)
router.post("/register", controller.processRegister)

router.get("/login", controller.login)




module.exports = router