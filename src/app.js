const path = require('path'); //ok

const express = require('express'); //ok
const app = express(); //ok

const { send } = require('process');


//Server Start
app.set('port',process.env.PORT || 3000) //establece el puerto que nos da el server o el 3000
app.listen(app.get('port'),() => console.log('conectado a http://localhost:' + app.get('port')));//levanta la pagina

//Public Access
app.use(express.static(path.resolve(__dirname,"../public"))); //igual que antes pero con un . adicional

//View Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"./views"));


//Routes
const rutasMain = require('./routes/main');
const rutasProducts = require('./routes/products');
const rutasUsers = require('./routes/users');
const rutasCheckout = require('./routes/checkout');


// App Use
app.use('/',rutasMain);
app.use('/products',rutasProducts);
app.use('/users',rutasUsers);
app.use('/checkout',rutasCheckout);