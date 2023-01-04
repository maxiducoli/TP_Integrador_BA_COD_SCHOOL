const { Schema, model } = require('mongoose');
//const mongooseDelete = require('mongoose-delete');
const Product = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
});
//Plugin para borrar un producto de manera virtual ( no lo borra de la base de datos)
//pero el cliente final no lo va a estar viendo.

//Product.plugin(mongooseDelete, {overrideMethods: 'all'} );
module.exports = model('Product', Product);