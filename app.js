const path = require('path');
const fs =require('fs')
const express = require('express');
const app = express();
const { send } = require('process');


app.set('port',process.env.PORT || 3000) //establece el puerto que nos da el server o el 3000

app.listen(app.get('port'),() => console.log('conectado a http://localhost:' + app.get('port')));//levanta la pagina

app.use(express.static (path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
    // el resolve se puede separar, lo bueno es que no haria falta mover la ruta todo el tiempo solo el archivo
    // el join agrega las / entre cada parametro que le metamos
    res.sendFile(path.join(__dirname, "view", "home.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "register.html")); // get register
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "login.html")); // get login
});

app.get("/product", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "product.html")); // get product
});

app.get("/error", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "error.html")); // get error
});

app.get("/cart", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "cart.html")); // get cart
});

app.get("/newprod", (req, res) => {
    res.sendFile(path.join(__dirname, "view", "product_new.html")); // get cart
});