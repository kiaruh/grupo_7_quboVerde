const path = require('path');
const express = require('express');
const app = express();

app.listen(3000, ()=> console.log("conectado a http://localhost:3000"));

app.use(express.static (path.resolve(__dirname, "./public")));

app.get("/", (req, res) => {
    // el resolve se puede separar, lo bueno es que no haria falta mover la ruta todo el tiempo solo el archivo
    // el join agrega las / entre cada parametro que le metamos
    res.sendFile(path.join(__dirname, "view", "home.html"));
});

