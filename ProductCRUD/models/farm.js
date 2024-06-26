const mongoose = require('mongoose');
const Product = require('./products');  // Requiring Products schema because we need it to delete the
// products as we Delete the Farm in which they exist
const { Schema } = mongoose;
const farmSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Farm must havce a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email Required!']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]

})
// Delete Middleware
farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        const result = await Product.deleteMany({ _id: { $in: farm.products } })
        console.log(result)
    }
})
const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;