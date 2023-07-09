const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews')
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------

//Reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

//Deleting Reviews
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {

    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { review: reviewId } })
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;