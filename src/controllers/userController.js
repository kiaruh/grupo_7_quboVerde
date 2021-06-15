const controller = {
    register: (req,res) => res.render("users/register"), // get register
    login: (req,res) => res.render("users/login"), // get login
}

module.exports = controller;