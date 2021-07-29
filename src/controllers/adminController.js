const express = require('express');

const mainController = {
    menu: (req,res) => res.render("products/admin/panel_admin")
}

module.exports = mainController;