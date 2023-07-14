const express = require('express');
const multer = require('multer');
const { storage } = require('../cloudinary')
const upload = multer({ storage });
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validationCampground } = require('../middleware')
//----------------------------------------------------------------------------------

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validationCampground, catchAsync(campgrounds.createCampground))

//Creating and Posting New Campgrounds
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get(catchAsync(campgrounds.showCampgroundById))    //Show Campgrounds by ID
    .put(isLoggedIn, isAuthor, upload.array('image'), validationCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))     //Deleting Campgrounds


//Editing the Campgrounds
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router;