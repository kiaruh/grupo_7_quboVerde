const express = require('express');
const path = require('path'); 
const method = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')

const { send } = require('process');


//session
app.use(session({secret: "quboverde",resave: false,saveUninitialized: false}))

//middlewares
//app.use(userLoggedMiddleware)
app.use(express.urlencoded({ extended: false }))
app.use(cookies())

//Server Start
app.set('port',process.env.PORT || 3000) //establece el puerto que nos da el server o el 3000
app.listen(app.get('port'),() => console.log('conectado a http://localhost:' + app.get('port')));//levanta la pagina

//Public Access
app.use(express.static(path.resolve(__dirname,"../public"))); //igual que antes pero con un . adicional

//View Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"views"));

//Data configuration (Importante: debe estar antes de las rutas)
app.use(express.urlencoded({extended:false})) //permite procesar info de un formulario
app.use(method("_method")) //parámetro debe coincidir con la ruta en el formulario ?_method=PUT/PATCH/DELETE


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


// app.get("/newprod", (req, res) => {
//     res.sendFile(path.join(__dirname, "../view", "product_new.html")); // get cart
// });

//Para los formularios
//npm i method-override