const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})
app.use('/dogs', (req, res, next) => {
    console.log("I Love Dogs!")
    next();
})
const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chicken') {
        next();
    }
    throw new Error('Password Required!')
}
app.get('/', (req, res) => {
    console.log(`Request Date: " ${req.requestTime}`)
    res.send('Home Page!')
})
app.get('/error', (req, res) => {
    chicken.fly()
})
app.get('/dogs', (req, res) => {
    console.log(`Request Date: " ${req.requestTime}`)
    res.send('Woof!')
})
app.get('/secret', verifyPassword, (req, res) => {
    res.send('My Secret!')
})
app.use((req, res) => {
    res.status(404).send('Not Found! =')
})
app.listen(3000, () => {
    console.log("Listening of Port 3000")
})