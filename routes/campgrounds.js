
const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utils/catchAsync');
const Campground = require('../models/campground');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage }= require('../cloudinary');
const upload = multer ({storage});



router.route('/')
               .get(catchAsync(campgrounds.index))
              .post(isLoggedIn,  upload.array('image'), validateCampground , catchAsync(campgrounds.createCampground));
            //  .post(upload.array('image'),  (req, res) => {
             //console.log(req.body, req.files);
              // res.send("IT WORKED")


router.get('/new', isLoggedIn, campgrounds.renderNewForm)


router.route('/:id')
                 .get(catchAsync(campgrounds.showCampground))
                 .put(isLoggedIn, isAuthor, upload.array('image'),  validateCampground, catchAsync(campgrounds.updateCampground))
                 .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

                 
router.get('/:id/edit', isLoggedIn, isAuthor,  catchAsync(campgrounds.renderEdit))



module.exports = router;



























/*
const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const { campgroundSchema } = require('../schemas.js');



const validateCampground = (req, res, next ) => { 
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
  
  }


router.get('/',  catchAsync(async (req, res)=> {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds })
}));


router.get('/new', (req, res) => {
   res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async(req, res, next) => {
  //if(!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
 
  const campground = new Campground(req.body.campground);
  await campground.save();
  res.redirect(`/${campground._id}`) 
   
}))


router.get('/:id', catchAsync(async(req, res) => {
   const campground = await Campground.findById(req.params.id).populate('reviews');
   res.render('campgrounds/show', {campground})
}))

router.get('/:id/edit', catchAsync(async(req, res) => {
   const campground = await Campground.findById(req.params.id)
   res.render('campgrounds/edit', {campground})
}))

router.put('/:id', catchAsync(async(req, res) => {
   const { id } = req.params;
   const campground =  await Campground.findByIdAndUpdate(id, {...req.body.campground })
   res.redirect(`/campgrounds/${campground._id}`)

}))

router.delete('/:id', catchAsync(async(req, res) => {
   const{ id } = req.params;
   const campground = await Campground.findByIdAndDelete(id);
   res.redirect(`/campgrounds`)
}))

module.exports = router;

*/