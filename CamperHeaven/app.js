const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const mongoose = require('mongoose');
const ExpressError = require('./utils/ExpressError');


const campgrounds = require('./routes/campgrounds');
const reviews = require('./routes/reviews');


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
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')))
//----------------------------------------------------------------------------------

const ValidationCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }
    else {
        next();
    }
}

//----------------------------------------------------------------------------------
//Web Page

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)



//Errors
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Something went wrong'
    res.status(statusCode).render('error', { err });
})


//----------------------------------------------------------------------------------

app.listen(3000, () => {
    console.log('Serving Port 3000')
})