const path = require('path');
const fs = require('fs');

const pathDataBase = path.resolve(__dirname, '../data/products.json');
const productJson = fs.readFileSync(pathDataBase, 'utf8');

const products = JSON.parse(productJson);


module.exports = {
    home: (req, res) => {
     res.render('index', {productos: products});
    },
    
};