const express = require("express");
const bodyparser = require('body-parser');
const session = require('express-session');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyparser.json())

// ----------------------------------------------------
// Conecta al puerto y manda mensaje a la consola de exito

const port = 3000;

app.listen(port, () => {
  console.log('Servidor a su servicio en el puerto', port);
});

// ----------------------------------------------------
// Middleware para sesiones

app.use(session({
  secret: 'asdjaksd1oijo12',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // establece en true si usas HTTPS
}));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.userId ? true : false;
  next();
});



// ----------------------------------------------------
// Conexión a base de datos

const mongoose = require('mongoose');

const dbname = 'Gimnasio';
const uri = `mongodb://127.0.0.1:27017/${dbname}`;

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log(e))

// -----------------------------------------------------
// Motor de plantillas

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

// Rutas 
app.use('/', require('./router/rutas'));
app.use('/sesion', require('./router/Clientes'));



// Ruta alterna a la que recorre si no encuentra url
app.use((req,res, next) =>{
  res.status(404).render("404", {
      titulo: "404",
      descripcion: "Titulo del sitio web"
  });
});

// -----------------------------------------------------


