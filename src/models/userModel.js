const fs = require("fs")
const path = require('path')
const directory = path.resolve(__dirname,"../data","users.json");

const User = {

	getData: function () {
		return JSON.parse(fs.readFileSync(directory, "utf-8"));
	},

	generateId: function () {
		let allUsers = this.findAll();
		let lastUser = allUsers.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findAll: function () {
		return this.getData();
	},

	findByPk: function (id) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser.id == id);
		return userFound;
	},

	findUserId: function (id) {
		let allUsers = this.findAll();
		let userResults = [];
		let userFound = allUsers.find(oneUser => oneUser.id == id)
        userResults.push(userFound);
        return userResults;
	},

	findByField: function (field, text) {
		let allUsers = this.findAll();
		let userFound = allUsers.find(oneUser => oneUser[field] == text);
		return userFound;
	},
	findByUser: function (user){
		let allUsers = this.findAll()
		let userFound = allUsers.find( oneUser => oneUser.username == user)
		return userFound
	},

	create: function (userData) {
		let allUsers = this.findAll();
		let newUser = {
			id: this.generateId(),
			...userData
		}
		allUsers.push(newUser);
		fs.writeFileSync(directory, JSON.stringify(allUsers, null,2));
		return newUser;

	},

	delete: function (id) {
		let list = this.getData();
		let deleteIndex = list.findIndex(prod => prod.id == id)
		list.splice(deleteIndex, 1);
		fs.writeFileSync(directory, JSON.stringify(list, null, 2));
		return true;
	},
	mod: function(id, data){
        let allUsers = this.getData();
        let modIndex = allUsers.findIndex(obj => obj.id == id);
		
        allUsers[modIndex] = data;
	

        let modUserJson = JSON.stringify(allUsers,null,2);
		
        fs.writeFileSync(directory, modUserJson)
		
    }
}

module.exports = User;
