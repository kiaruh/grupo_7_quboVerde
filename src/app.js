const express = require('express');
const path = require('path'); 
const method = require('method-override');
const session = require('express-session');
const cookies = require('cookie-parser');
const bodyParser = require('body-parser')

const app = express();

const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')


const { send } = require('process');

//session
app.use(session({secret: "quboverde",resave: false,saveUninitialized: false}))


//middlewares
app.use(cookies())
app.use(express.urlencoded({ extended: false }))
app.use(userLoggedMiddleware)


// micro-middleware para enviar los datos de productos al formulario de busqueda en todas las vistas
// pero modificado para andar con la db 
const db = require('../src/database/models');
//const product = require("./models/productModel")

let dataSearch = async function(req, res, next) {
    try {
    let data = await db.Product.findAll(
        {
            // include: [{association: 'precios'}, {association: 'especies'}, {association: 'imagenes'}]
        });
    res.locals.produ = data;
    next();
    } catch(e){
        throw e;
    }
    
}

app.use(dataSearch);

//Public Access
app.use(express.static(path.resolve(__dirname,"../public"))); //igual que antes pero con un . adicional

//Data configuration (Importante: debe estar antes de las rutas)
app.use(express.urlencoded({extended:false})) //permite procesar info de un formulario (esta dos veces, despues sacamos uno)
app.use(method("_method")) //parámetro debe coincidir con la ruta en el formulario ?_method=PUT/PATCH/DELETE


//Server Start
app.set('port',process.env.PORT || 3000) //establece el puerto que nos da el server o el 3001
app.listen(app.get('port'),() => console.log('conectado a http://localhost:' + app.get('port')));//levanta la pagina


//View Engine
app.set("view engine","ejs");
app.set("views",path.resolve(__dirname,"views"));



//Routes
const rutasMain = require('./routes/main');
const rutasProducts = require('./routes/products');
const rutasUsers = require('./routes/users');
const rutasCheckout = require('./routes/checkout');
const rutasAdmin = require('./routes/admin');



// App Use
app.use('/',rutasMain);
app.use('/products',rutasProducts);
app.use('/users',rutasUsers);
app.use('/checkout',rutasCheckout);
app.use('/admin',rutasAdmin);

// API 
const rutasApi = require('./routes/api');
app.use('/api',rutasApi);

