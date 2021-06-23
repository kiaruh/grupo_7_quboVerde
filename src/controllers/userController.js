const usercontroller = {
    register: (req,res) => res.render("users/register"), // get register
    login: (req,res) => res.render("users/login"), // get login
    newprod: (req,res) => res.render("users/product_new"), // get new product
    modprod: (req,res) => res.render("users/product_form"), // get product modification

}

module.exports = usercontroller;