/* ShoppingCart mongoose model */
const { Item } = require("item");
const mongoose = require('mongoose');

// create an ShoppingCart schema
const ShoppingCartSchema = mongoose.Schema({
    id: {type: Number, required: true},
    items: {type:[Item], required: true, default: []},
    tax: {type: Number, required: true, default: 0},
    discount: {type: Number, required: true, default: 0}
});

// create an ShoppingCart model using the schema
const ShoppingCart = mongoose.model('shoppingCart', ShoppingCartSchema);

module.exports = { ShoppingCart };