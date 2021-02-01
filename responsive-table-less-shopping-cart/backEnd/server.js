/* server.js */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

const cors = require('cors');
app.use(cors());

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose model
const { Item } = require("./models/item");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

/*********************************************************/

/*** ShoppingCart API Routes below ************************************/

/***
 * A PUT route to *add* or *update* an item, will return an item.
 * Call with a request jason object
 * {    "name": <name>
 *      "price": <price>,
 *      "quantity": <quantity>,
 *      "stock": <stock>
 * }
 */
app.put("/api/item/put", async (req, res) => {
    try {
        const existingItem = await Item.findOne({"name": req.body.name})
        if (existingItem) {
            const updatedItem = await Item.findOneAndUpdate({"name": req.body.name}, req.body);
            res.status(200).send(updatedItem);
            return;
        }
        // add a new item if not exist
        const item_ = new Item({
            ...req.body,
        })
        const newItem = await item_.save();
        res.status(200).send(newItem);
    } catch (error) {
        log(error)
        res.status(400).send("Bad Request");
    }
});

/***
 * A GET route to get all items, returns an array of all items.
 * No input or url parameter needed.
 */

app.get("/api/item/get", async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).send(items)
    } catch (error) {
        log(error)
        res.status(400).send("Bad Request");
    }
});

/***
 * A GET route to get an item by name, returns an item.
 * One Url parameter is needed: <name>.
 */
app.get("/api/item/get/:name", async (req, res) => {
    try {
        const item_ = await Item.find({"name": req.params.name})
        if (!item_) {
            res.status(404).send("No such an item")
        } else {
            res.status(200).send(item_)
        }

    } catch (error) {
        log(error)
        res.status(400).send("Bad Request");
    }
});

/***
 * A GET route to get the final price with parameters <tax> and <discount>
 * Two Url parameters are needed: <tax>&<discount>.
 */
app.get("/api/item/cost/:tax&:discount", async (req, res) => {
    try {
        log(req.params)
        const taxRate = req.params.tax
        const discountRate = req.params.discount
        const items = await Item.find()
        let cost = 0
        items.map(item => {cost = cost+ item.price * item.quantity})
        const subtotal = cost
        const tax = subtotal * taxRate
        const discount = subtotal * discountRate
        cost = subtotal + tax - discount
        console.log((cost))
        res.send({"subtotal": subtotal, "tax": tax, "discount": discount, "total": cost,})
    } catch (error) {
        log(error)
        res.status(400).send("Bad Request");
    }
});

/*** Webpage routes below **********************************/


/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});