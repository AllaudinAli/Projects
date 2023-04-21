const mongoose = require('mongoose');
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
            ref: 'Products'
        }
    ]

})

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;