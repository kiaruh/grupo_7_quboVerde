//Express
const express = require('express')
const router = express.Router()
const path = require('path');
const multer = require('multer')

// const { body, validationResult } = require('express-validator')
//Controller require
const controller = require('../controllers/userController')

//Middlewares
const validations = require('../middlewares/validationRegisterMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')
//const fileUpload = require('../middlewares/multerAvatarMiddleware')


const mds = multer.diskStorage({
    destination: (req, file, callback) => {
        let prodFolder = path.resolve(__dirname, '../', '../public', 'img', 'upload','avatar');
        callback(null, prodFolder);
    },
    filename: (req, file, callback) => {
        let prodName = req.body.producto;
        let nameToSave = "avatar"
        let imgName = nameToSave + "-" + Date.now() + path.extname(file.originalname);
        callback(null,imgName);
    }
});
const fileUpload = multer({storage: mds});

//Route
router.get("/register",guestMiddleware, controller.register)
router.post("/register",validations, controller.processRegister)

router.get("/login",guestMiddleware, controller.login)
router.post("/login", controller.loginProcess)

// rutas para perfil de usuario
// router.get("/profile/:username",authMiddleware, controller.profile);
router.get("/profile/",authMiddleware, controller.profile);

// rutas para modificar perfil de usuario
router.get("/mod/:id", controller.getProfile);
router.put("/mod/:id", fileUpload.single("avatar"),validations , controller.setProfile); //pendiente setear img default

router.delete("/delete/:id", controller.delUser);

// Logout
router.get('/logout/', controller.logout);

// rutas para modificar lista de admins
router.get("/admin", controller.adminList);
router.put("/admin", controller.adminSet);

module.exports = router
