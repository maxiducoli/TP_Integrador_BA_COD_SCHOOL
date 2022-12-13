// requerimos el path, que nos va a ayudar a hacer las rutas de las views y el HTML
const path = require('path');
// requerimos express
const express = require('express');
// ejecutamos express y lo guardamos dentro de la constante app
const app = express();
// view engine
app.set('view engine', 'ejs');
// seteando vistas
app.set('views', path.resolve(__dirname , 'views'));
// Seteando la carpeta de archivos públicos
app.use(express.static(path.resolve(__dirname , '../public')));
//console.log(path.resolve(__dirname , '../public'));
// requerimos el main.js que es en donde tenemos el get del home page
const mainRoute = require('./routes/main');
const products = require('./routes/products');
// usamos el main requerido
app.use('/', mainRoute);
// usamos el products
app.use('/products', products);
//app.use('/add', products.add);
//app.use('/edit', products.edit);

// Middleware de aplicación que nos redirige a la página notfound
app.use((req, res, next) => {
    res.render('notfound');
    next();
});
// Si llegué hasta acá, es  porque está andando todo bien.
app.listen(3000, () => console.log("Servidor funcionando"));