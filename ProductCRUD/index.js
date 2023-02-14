const express = require('express');
const app = express();
const path = require('path');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const Product = require('./models/products');

mongoose.connect('mongodb://0.0.0.0:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTED!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!")
        console.log(err);
    })

app.set('view', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.send('All Products will Display Here!')
})

app.listen(3000, () => {
    console.log("CONNECTED TO PORT 3000!")
})