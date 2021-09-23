const User = require('../models/userModel')
const db = require('../database/models')

async function userLoggedMiddleware(req,res,next){
	

	try {
		res.locals.isLogged = false
		let emailInCookie = req.cookies.email
	//let userFromCookie = User.findByField('email', emailInCookie)
	
	if(emailInCookie == undefined){
		emailInCookie = "";
	}
	
	console.log(emailInCookie);
	let userFromCookie = await db.User.findOne({
		where: {
			email: emailInCookie
		}
	})

	if(userFromCookie) {
		req.session.userLogged = userFromCookie
	}

	if(req.session && req.session.userLogged){
		res.locals.isLogged = true
		res.locals.userLogged = req.session.userLogged
	}

	next()

	

	
	

	} catch(e){
		console.log("fallo userlogghedmiddleware")
		//console.log(userFromCookie)
		//console.log(emailInCookie)
		//console.log(pruebausers)
		console.log(e)
		
	}
	

}

module.exports = userLoggedMiddleware