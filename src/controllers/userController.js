const bcryptjs = require("bcryptjs")
const {validationResult} = require("express-validator")
const { send } = require("process")
const imgController = require("../models/imgModel")
const User = require("../models/userModel")

// requerir el modelo

const db = require('../database/models');
const Op = db.Sequelize.Op;


const usercontroller = {

    register: (req,res) => {
		res.render("users/register")}, // get register

    processRegister: async function (req,res) {

		try {
			
			const resultValidation = validationResult(req)
			if(resultValidation.errors.length > 0){
				return res.render("users/register", {errors: resultValidation.mapped(), oldData: req.body})
			}
		
			let userInDB = await db.User.findOne({
				where: {
					email: req.body.email
				}
			})
	
			if(userInDB != undefined || userInDB != null ) {
			   return res.render("users/register", {errors: { email: { msg: "Este mail ya fue utilizado" } }, oldData: req.body})
			} else {
			let img = `avatar${Math.floor(Math.random() * 9) + 1}.png`
		     
			//User.create(userTocreate)
			await db.User.create({
				user: req.body.user,
				bday: Date(req.body.bday),
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				email: req.body.email,
				password: bcryptjs.hashSync(req.body.password, 10),
				admin: 0, 
				avatar:img,
				send_ID: 0,
				pm_ID: 0
			});

			console.log (req.body.date);
			return res.redirect("/users/login")
		}

		} catch(e){
			throw e
		}
		
    },

    login: (req,res) => {
		res.render("users/login")}, // get login

    loginProcess: async function (req, res) {
		
		
		try{
			// let userToLogin = User.findByField('email', req.body.email);

			let userToLogin = await db.User.findOne({
				where: {email: req.body.email}
			})

			if(userToLogin != null || userToLogin != undefined) {
				let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);
				if (isOkThePassword) {
					//return res.send('ingresaste')
					delete userToLogin.password;
					req.session.userLogged = userToLogin;
	
					if(req.body.recordar) {
						res.cookie('email', req.body.email, { maxAge: (1000 * 60) * 60 })
					}
					
					return res.render('users/profile', {users: userToLogin});
					
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
		}catch(e){
			throw e
		}

		
	
	},

	profile: (req,res) => {

		res.render("users/profile" ,{users:User.findUserId(req.session.userLogged.id)})}, // get userprofile (temporal para que no se rompa la ruta)
	//profilebyid: (req,res) => res.render("users/profile",{users:User.findUserId(req.params.id)}), // get userprofile por id
	getProfile: async function(req,res) {
		try{

		let users = await db.User.findByPk(req.params.id)

		res.render("users/profile_mod", {users:users})

		}catch(e){
			throw e
		}

		
	}, //formulario de modificacion

	setProfile: async function(req,res) {

		try {

		let imgPath = "";

		let avatarName = await db.User.findByPk(req.params.id);

		if(req.file == undefined){
			imgPath = avatarName.avatar;
		} else {
			imgController.deleteImgAvatar(avatarName.avatar);
			imgPath = req.file.filename;
		}

		await db.User.update({
			user: req.body.user,
			bday: req.body.bday,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			email: req.body.email,
			password: bcryptjs.hashSync(req.body.password, 10),
			admin: 0, 
			avatar: imgPath,
			send_ID: 0,
			pm_ID: 0
		}, {
			where: {id: req.params.id}
		});

		let users = await db.User.findByPk(req.params.id);

		res.render("users/profile_mod", {users:users})

		}catch(e){
			throw e
		}
		
	},

	delUser: async function(req, res){
        
		try{
		let deleteImg = await db.User.findByPk(req.params.id);

        imgController.deleteImg(deleteImg.avatar);
       
		await db.User.destroy({
			where: {id: req.params.id}
		})

        res.redirect("/");

		}catch(e){
			throw e
		} 

    },
	logout: (req,res) => {
		res.clearCookie('email')
		req.session.destroy()
		res.redirect('/')
	}


	// queda pendiente crear la función que toma la imagen de perfil preexistente, else mostrar default

}

module.exports = usercontroller