const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")

const User = require("../models/productModel")


const usercontroller = {

    register: (req,res) => res.render("users/register"), // get register

    processRegister: (req,res) => {
        const resultValidation = validationResult(req)
        if(resultValidation.erros.length > 0){
            return res.render("users/register", {erros: resultValidation.mapped(), oldData: req.body})
        }
        let userInDB = User.findByField('email', req.body.email)

        if(userInDB) {
            return res.render("users/register", {errors: { email: { msg: "Este mail ya fue utilizado" } }, oldData: req.body})
        }
        let userTocreate = { ...req.body, password: bcryptjs.hashSync(req.body.password, 10), avatar: req.file.filename }

        User.create(userTocreate)

        return res.redirect("users/login")

    },

    login: (req,res) => res.render("users/login"), // get login
    

}

module.exports = usercontroller