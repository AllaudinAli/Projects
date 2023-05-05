const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
const Product = require('./models/products');
const Farm = require('./models/farm')
const AppError = require('./AppError');
mongoose.connect('mongodb://0.0.0.0:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTED!")
    })
    .catch(err => {
        console.log("MONGO CONNECTION ERROR!")
        console.log(err);
    })
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//Farm Routes

app.get('/farms', async (req, res) => {
    const farms = await Farm.find({});
    res.render('farms/index', { farms })
})
// New
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})
// Show
app.get('/farms/:id', async (req, res) => {
    const farm = await Farm.findById(req.params.id).populate('products');
    res.render('farms/show', { farm })
})
app.post('/farms', async (req, res) => {
    const farm = new Farm(req.body)
    await farm.save()
    res.redirect('/farms')
})
app.get('/farms/:id/products/new', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    res.render('products/new', { categories, farm })
})
app.post('/farms/:id/products', async (req, res) => {
    const { id } = req.params;
    const farm = await Farm.findById(id);
    const { name, price, category } = req.body;
    const product = new Product({ name, price, category });
    farm.products.push(product);
    product.farm = farm;
    await farm.save();
    await product.save();
    res.redirect(`/farms/${farm._id}`)
})
// Deleting
app.delete('/farms/:id', async (req, res) => {
    const farm = await Farm.findByIdAndDelete(req.params.id);
    res.redirect('/farms');
})


//Products Routes
const categories = ['fruit', 'vegetable', 'dairy'];
//Index
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})



//Adding Products
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})


//Viewing Products
app.get('/products/:id', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate('farm', 'name');
    if (!product) {
        return next(new AppError('Product not found!', 404));
    }
    res.render('products/show', { product })
})


//Updating Products
app.get('/products/:id/edit', async (req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new AppError('Product not found!', 404));
    }
    res.render('products/edit', { product, categories })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    res.redirect(`/products/${product._id}`)
})


//Deleting Product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})


//Error Handling
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something went Wrong!' } = err;
    res.status(status).send(message);
})


app.listen(3000, () => {
    console.log("CONNECTED TO PORT 3000!")
})