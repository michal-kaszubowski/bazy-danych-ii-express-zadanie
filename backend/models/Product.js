const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    price: {
        type: Number,
        require: true,
        min: 0
    },
    description: {
        type: String,
        default: '',
        require: false
    },
    quantity: {
        type: Number,
        require: true,
        min: 0
    },
    unit: {
        type: String,
        require: true
    },
}, {
    collection: 'products'
});

module.exports = model('Product', productSchema);