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



