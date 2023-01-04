const path = require('path');
const fs = require('fs');
const Product = require('../database/models/Product');
module.exports = {
    home: async function (req, res) {
        const products = await Product.find();
    res.render('index', {productos: products});
    },
    search: async (req, res) => {
        const search = req.query.search;
        const products = await Product.find({});
        const searchRes = products.filter((product) => product.description.toLowerCase().includes(search.toLowerCase()) || product.name.toLowerCase().includes(search.toLowerCase()));
        res.render("index",{productos: searchRes});
    }
};