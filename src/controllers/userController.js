const controller = {
    register: (req,res) => res.render("register"), // get register
    login: (req,res) => res.render("login"), // get login
}

module.exports = controller;



// router.get("register", (req, res) => {
//     res.render("register"); // get register
// });

// router.get("login", (req, res) => {
//     res.render("login"); // get login
// });
