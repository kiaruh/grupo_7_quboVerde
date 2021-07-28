const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")
const { send } = require("process")

const imgController = require("../models/imgModel")
const User = require("../models/userModel")


const usercontroller = {

    register: (req,res) => res.render("users/register"), // get register

    processRegister: (req,res) => {
		//res.send(req.body)
        const resultValidation = validationResult(req)
        if(resultValidation.errors.length > 0){
            return res.render("users/register", {errors: resultValidation.mapped(), oldData: req.body})
        }
        let userInDB = User.findByField('email', req.body.email)

        if(userInDB) {
           return res.render("users/register", {errors: { email: { msg: "Este mail ya fue utilizado" } }, oldData: req.body})
        }
		let img = `avatar${Math.floor(Math.random() * 9) + 1}.png`
	
    	let userTocreate = { ...req.body,password: bcryptjs.hashSync(req.body.password, 10),admin:false, avatar:img};       
    	User.create(userTocreate)
    	return res.redirect("/users/login")
    },

    login: (req,res) => {res.render("users/login")}, // get login

    loginProcess: (req, res) => {
		let userToLogin = User.findByField('email', req.body.email);
		
		if(userToLogin) {
			let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				//return res.send('ingresaste')
				delete userToLogin.password;
				req.session.userLogged = userToLogin;

				if(req.body.remember_user) {
					res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
				}
				
				return res.redirect('/users/profile/'+ userToLogin.username);
				
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
					msg: 'credenciales inválidas'
				}
			}
		});
	},

	profile: (req,res) => {res.render("users/profile" ,{users:User.findUserId(req.session.userLogged.id)})}, // get userprofile (temporal para que no se rompa la ruta)
	//profilebyid: (req,res) => res.render("users/profile",{users:User.findUserId(req.params.id)}), // get userprofile por id
	getProfile: (req,res) => res.render("users/profile_mod", {users:User.findUserId(req.params.id)}), //formulario de modificacion

	setProfile: (req,res) => {
		let list = User.findAll();
		let userIndex = list.findIndex(user => user.id == req.params.id);
		let imgPath = "";

		if(req.file == undefined){
			imgPath = list[userIndex].avatar;
		} else {
			imgController.deleteImgAvatar(list[userIndex].avatar);
			imgPath = req.file.filename;
		}
		let updatedUser = {
			id:Number(req.params.id),...req.body,password: bcryptjs.hashSync(req.body.password, 10), avatar:imgPath
		}

		User.mod(updatedUser.id,updatedUser);
		res.redirect('/users/profile/' + updatedUser.id)
	},
	delUser: function(req, res){
        let setId = req.params.id;
        let list = User.findAll();

        let delIndex = list.findIndex(user => user.id == setId)
        let deleteImg = list[delIndex].avatar;

        imgController.deleteImg(deleteImg);
        let a = User.delete(setId);
		console.log(a);

        res.redirect("/");

    },
	logout: (req,res) => {
		req.session.destroy()
		res.redirect('/')
	}


	// queda pendiente crear la función que toma la imagen de perfil preexistente, else mostrar default

}

module.exports = usercontroller