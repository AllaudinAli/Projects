const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const campgrounds = require('../controllers/campgrounds');
const { isLoggedIn, isAuthor, validationCampground } = require('../middleware')
//----------------------------------------------------------------------------------

router.get('/', catchAsync(campgrounds.index))

//Creating and Posting New Campgrounds
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.post('/', isLoggedIn, validationCampground, catchAsync(campgrounds.createCampground))

//Show Campgrounds by ID
router.get('/:id', catchAsync(campgrounds.showCampgroundById))

//Editing the Campgrounds
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

router.put('/:id', isLoggedIn, isAuthor, validationCampground, catchAsync(campgrounds.updateCampground))

//Deleting Campgrounds
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router;