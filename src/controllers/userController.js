const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")
const { send } = require("process")

const User = require("../models/userModel")


const usercontroller = {

    register: (req,res) => res.render("users/register"), // get register

    processRegister: (req,res) => {
        // const resultValidation = validationResult(req)
        // if(resultValidation.erros.length > 0){
        //     return res.render("users/register", {errors: resultValidation.mapped(), oldData: req.body})
        // }
        // let userInDB = User.findByField('email', req.body.email)

        // if(userInDB) {
        //     return res.render("users/register", {errors: { email: { msg: "Este mail ya fue utilizado" } }, oldData: req.body})
        // }
    let userTocreate = { ...req.body,password: bcryptjs.hashSync(req.body.password, 10)};       
    let newUser =  User.create(userTocreate);
    return res.redirect("/users/login")
    },

    login: (req,res) => res.render("users/login"), // get login

    loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/');
			} 
			return res.render('users/login', {
				errors: {
					email: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'No se encuentra este email en nuestra base de datos'
				}
			}
		});
	}
    

}

module.exports = usercontroller