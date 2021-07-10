
const express = require('express');
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const Campground = require('../models/campground');
const Review = require('../models/review');
const reviews = require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');




router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;




























/*



const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');



const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body)
    if (error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



router.post('/campgrounds/:id/reviews',  validateReview,  catchAsync(async(req, res) => {
    const campground = await Campground.findById(req.params.id);
    const review = new Review(req.body.review); 
    campground.reviews.push(review);
   await review.save();
   await campground.save();
   res.redirect(`/campgrounds/${campground._id}`)

}) )


router.delete('/campgrounds/:id/reviews/:reviewId', catchAsync(async(req, res) => {
    const {id, reviewId} = req.params;
   await Campground.findByIdAndUpdate(id, { $pull : { reviews: reviewId}});
   await Review.findByIdAndDelete(reviewId);
    res.redirect(`/campgrounds/${id}`);

}))

module.exports = router;

*/