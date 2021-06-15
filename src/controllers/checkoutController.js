const path = require("path"); 

const checkoutController = {
    checkout: (req,res) => res.render("checkout/cart"),
}

module.exports = checkoutController;