const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
//Mongoose Connection
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/the-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
});

//Ejs Setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

//Web Page
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(3000, () => {
    console.log('Serving Port 3000')
})