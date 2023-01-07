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