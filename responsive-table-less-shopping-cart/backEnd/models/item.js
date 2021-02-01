/* Item mongoose model */
const mongoose = require('mongoose');

// create an Item schema
const ItemSchema = mongoose.Schema({
    name: {type: String, required:true, unique: true},
    price: {type: Number, required: true},
    quantity: {type: Number, required: true},
    stock:{type: Boolean, required: true}
});

// create an image model using the schema
const Item = mongoose.model('Item', ItemSchema);

module.exports = { Item };