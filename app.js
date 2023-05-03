const express = require("express");
const bodyparser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyparser.json())

const port = 3000;

// Motor de plantillas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + "/public"));

// Rutas 
app.use('/', require('./router/rutas'));

// Ruta alterna a la que recorre si no encuentra url
app.use((req,res, next) =>{
  res.status(404).render("404", {
      titulo: "404",
      descripcion: "Titulo del sitio web"
  });
});

// Conecta al puerto y manda mensaje a la consola de exito
app.listen(port, () => {
  console.log('Servidor a su servicio en el puerto', port);
});