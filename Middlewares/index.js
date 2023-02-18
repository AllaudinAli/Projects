const express = require('express');
const app = express();
const morgan = require('morgan');
const AppError = require('./AppError');

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
    throw new AppError('Password Required!', 401)
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

app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).send(message)
})




app.use((req, res) => {
    res.status(404).send('Not Found!')
})
app.listen(3000, () => {
    console.log("Listening of Port 3000")
})