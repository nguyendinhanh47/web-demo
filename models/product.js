var mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String
    },
    city: {
        type: String
    },
    quantity: {
        type: Number
    },
    image: {
        data: String,
        contentType: String
    }
});

module.exports = mongoose.model('Product', productSchema)