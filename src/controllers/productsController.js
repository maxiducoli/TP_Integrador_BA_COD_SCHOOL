const path = require('path');
const fs = require('fs');

const pathDataBase = path.resolve(__dirname, '../data/products.json');
const productJson = fs.readFileSync(pathDataBase, 'utf8');

const products = JSON.parse(productJson);


const productsController ={
product: (req, res) => {
    let product = products.filter(product =>{
        return product.id == req.params.id;
    });
    if (product.length == 0) {
        res.render('notfound');
    } 
res.render('products/product', {producto: product[0]});
},
add: (req, res) => {
res.render('products/add', {producto: products});
},
edit: (req, res) => {
    let product = products.filter(product =>{
        return product.id == req.params.id;
    });
    if (product.length == 0) {
        res.render('notfound');
    } 
res.render('products/edit', {producto: product[0]});
},
search: (req,res) => {
    let returnProducts = products.filter(product => {
    let nameProd = product.name.toLowerCase(); // Paso a minúsculas todo
    let resultProd = req.params.resultado.toLowerCase(); // Paso a minúsculas todo
    
        return nameProd.includes(resultProd);
    });
    res.render('index',{productos: returnProducts});
    // String de la búsqueda luego del req
}
};

module.exports = productsController;
