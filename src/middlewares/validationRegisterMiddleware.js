const path = require('path')
const { body } = require('express-validator')

module.exports = [ 
    body('user').notEmpty().withMessage('Tienes que escribir un usuario'),
    body('bday').notEmpty().withMessage('Tienes que seleccionar una fecha'),
    body('firstname').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('lastname').notEmpty().withMessage('Tienes que escribir un apellido'),
    body('email').notEmpty().withMessage('Tienes que escribir un email valido')
    .bail().isEmail().withMessage('Debes utilizar un formato del tipo email'),
    body('password').notEmpty().withMessage('Tienes que escribir una constraseña')
    // ,body('avatar').custom((value, { req }) => { 
    //     let file = req.file
    //     let acceptedExtensions = ['.jpg','.png','.gif']
    //     if(!file) {
    //         throw new Error('Tienes que subir una imagen')
    //     } else {
    //         let fileExtension = path.extname(file.originalname)
    //         if(!acceptedExtensions.includes(fileExtension)){
    //             throw new Error(`Formato valido ${acceptedExtensions.join(', ')}`)
    //         }
    //     }
        
    //     return true
    // })

]