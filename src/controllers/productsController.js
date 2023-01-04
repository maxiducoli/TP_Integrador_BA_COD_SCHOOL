const path = require('path');
const fs = require('fs');

const Product = require('../database/models/Product');
const productsController = {
    product: async function (req, res) {
        const product = await Product.findById(req.params.id);
        res.render('products/product', { producto: product });
    },
    add: (req, res) => {
        res.render('products/add');
    },
    // Para guardar datos con POST
    store: async (req, res) => {
        console.log(req.file);
        if (!req.file) {
            return res.redirect("products/fileext");
        }
        await Product.create({ ...req.body, image: req.file.filename });
        res.redirect("/");
    },
    // Editar producto
    edit: async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product.count <= 0) {
            return res.render('notfound');
        }
        res.render('products/edit', { producto: product });
    },
    fileext: (req, res) => {
        res.render("products/fileext", { producto: products });
    },
    update: async (req, res) => {
        const prod = await Product.findById(req.params.id);
        const tempFolder = path.join('public/images/products/temp/', prod.image);
        const imagePath = path.join('public/images/products/', prod.image);
        //fs.unlink - PARA BORRAR ARCHIVOS.
        //console.log(imagePath);
        if (!req.file) {
            const aFile = fs.copyFile(imagePath, tempFolder, (err) => {
                if (err) {
                    console.log("Error Found:", err);
                }
            });
            //console.log('ARCHIVO DESDE IMG/PRODUCTS');
            await Product.findByIdAndUpdate({ _id: req.params.id },
                {
                   // _id: req.params.id,
                    name: req.body.name,
                    brand: req.body.brand,
                    price: req.body.price
                },
                { image: aFile },
            );

        } else {
           // console.log("ARCHIVO DESDE PAGINA");

            await Product.findByIdAndUpdate({ _id: req.params.id },
                {
                   // _id: req.params.id,
                    name: req.body.name,
                    price: req.body.price,
                    brand: req.body.brand,
                    image: req.file.filename
                },
            );
        }
        return res.redirect("/");
    },
    delete: (req, res) => {
        //Product.findOneAndRemove  (COSA DE URI)
         //Product.delete No me gustó
         Product.findOneAndRemove({ _id: req.params.id }, (err, product) => {
            console.log(product);
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            fs.unlinkSync(path.join('public/images/products/', product.image));
            return res.redirect('/');
        });
    }
};
module.exports = productsController;