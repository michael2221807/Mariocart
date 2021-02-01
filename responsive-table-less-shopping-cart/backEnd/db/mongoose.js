
const mongoose = require('mongoose')

// Get the URI of the local database, or the one specified on deployment.
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://me:11223344@shoppingcart.w11l7.mongodb.net/shopping-cart?' +
    'retryWrites=true&w=majority'

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = { mongoose }  // Export the active connection.