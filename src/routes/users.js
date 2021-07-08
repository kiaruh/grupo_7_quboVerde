//Express
const express = require('express')
const router = express.Router()

//Controller require
const controller = require('../controllers/userController')

//Middlewares
const validations = require('../middlewares/validationRegisterMiddleware')
const avatarMulter = require('../middlewares/multerAvatarMiddleware')



//Route
router.get("/register", controller.register)
router.post("/register", controller.processRegister)

router.get("/login", controller.login)
router.post("/login", controller.loginProcess)

// rutas para perfil de usuario
router.get("/profile/", controller.profile);
router.get("/profile/:id", controller.profilebyid);

// rutas para modificar perfil de usuario
router.get("/mod/:id", controller.getProfile);
router.put("/mod/:id", fileUpload.single('img'),[avatarMulter], controller.setProfile); //pendiente setear img default

router.delete("/mod/:id", controller.delete);

module.exports = router
