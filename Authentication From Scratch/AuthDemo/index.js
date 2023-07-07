const express = require('express');
const app = express();
const User = require('./models/user');
app.get('/secret', (req, res) => {
    res.send('This is a Secret!')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.listen(3000, () => {
    console.log('SERVING YOUR APP')
})