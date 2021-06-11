const mainController = {
    index: (req,res) => res.render("home"), // get home
    error: (req,res) => res.render("error"), // get error
}

module.exports = mainController;