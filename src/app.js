// requerimos el path, que nos va a ayudar a hacer las rutas de las views y el HTML
const path = require('path');
// requerimos express
const express = require('express');
// ejecutamos express y lo guardamos dentro de la constante app
const app = express();
// Requerimos FileSystem
const fs = require('fs');
const WriteLogs =  require('../src/middlewares/createlog');
// Traemos la conexión de la base de datos del
const dbConnect = require('./config/mongo');
// view engine
app.set('view engine', 'ejs');
// seteando vistas
app.set('views', path.resolve(__dirname , 'views'));
// Seteando la carpeta de archivos públicos
app.use(express.static(path.resolve(__dirname , '../public')));
//console.log(path.resolve(__dirname , '../public'));
app.use(express.static(path.resolve(__dirname , 'src')));
// Para poder usar el POST.
app.use(express.urlencoded({ extended: true }));
// Escritor de log - Uso el middleware desde la carpeta middlerware, no el de
// aplicación porque me gusta más como queda ordenado.
app.use(WriteLogs);
// requerimos el main.js que es en donde tenemos el get del home page
const mainRoute = require('./routes/main');
const products = require('./routes/products');
// usamos el main requerido
app.use('/', mainRoute);
// usamos el products
app.use('/products', products);
// Middleware de aplicación que nos redirige a la página notfound
app.use((req, res, next) => {
    res.render('notfound');
    next();
});
// Conectamos a la DB
dbConnect();
// Si llegué hasta acá, es  porque está andando todo bien.
app.listen(3000, () => console.log('Servidor funcionando'));