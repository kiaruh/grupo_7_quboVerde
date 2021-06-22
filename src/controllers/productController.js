const productController = {
    detail: (req,res) => res.render("products/detail"),
    newprod: (req,res) => res.render("products/admin/product_new"), // get new product
    modprod: (req,res) => res.render("products/admin/product_mod"), // get product modification
    listado: function(){},
    crear: function(){},

}

module.exports = productController;