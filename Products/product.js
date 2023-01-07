const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("CONNETION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR")
        console.log(err);
    })
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a Positive integer']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    }
})

const Product = mongoose.model('Product', productSchema);
const bike = new Product({ name: 'BMX Jersey', price: 349.99, categories: ['Cycling'], size: 'L'})
bike.save().then(data => {
    console.log("It Worked!")
    console.log(data)
}).catch(err => {
    console.log('Oh no Error!')
    console.log(err.errors.name.properties.message);
})

// Product.findOneAndUpdate({ name: 'Tire Pump' }, { price: 2.99 }, { new: true, runValidators: true })
//     .then(data => {
//         console.log("It Worked!")
//         console.log(data)
//     }).catch(err => {
//         console.log('Oh no Error!')
//         console.log(err);
//     })