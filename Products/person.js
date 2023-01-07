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

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})
personSchema.virtual('fullName').get(function () {
    return `${this.first} ${this.last}`
})
personSchema.pre('save', async function () {
    this.first = 'Yo';
    this.last = 'Mama';
    console.log("About to Save!!")
})
personSchema.post('save', async function () {
    console.log("Just Saved!!")
})
const Person = mongoose.model('Person', personSchema);
