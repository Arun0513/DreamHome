var mongoose = require('mongoose');

var addproductSchema = new mongoose.Schema({

    housetype: {
        type: String,
        required: [true, "Must Provide housetype"],
    }, 
    price: {
        type: String,
        required: [true, "Must Provide price"],
    },
    rooms: {
        type: String,
        required: [true, "Must Provide Rooms "],
    },
    sqft: {
        type: String,
        required: [true, "Must Provide sqft"],
    },
    classification: {
        type: String,
        required: [true, "Must Provide classification"],
        default:"pending"
    },
})

module.exports = mongoose.model('addproduct', addproductSchema);  