const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers');



mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database Connected")
});




const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 11; i++) {
        const random1000 = Math.floor(Math.random() * 10);
        const price = Math.floor(Math.random() * 10) + 10;
        const camp = new Campground({
            //default user ID for seeding
            author:'60d1ac8ad1e2ed1e6c4e3861',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum explicabo perspiciatis, velit ut corporis inventore nulla ea quaerat blanditiis! Asperiores eos modi dolores fugiat aliquid aliquam sunt neque voluptatum accusantium?',
            price,
            geometry : { 
                type : "Point",
                 coordinates: [
                      cities[random1000].longitude,
                    cities[random1000].latitude
                 ] 
                },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/drr8jy6n2/image/upload/v1625745679/YelpCamp/lyixbohsj2wphimns3s6.jpg',
                  filename: 'YelpCamp/lyixbohsj2wphimns3s6'
                },
                {  
                    url: 'https://res.cloudinary.com/drr8jy6n2/image/upload/v1625745679/YelpCamp/lyixbohsj2wphimns3s6.jpg',
                    filename: 'YelpCamp/lyixbohsj2wphimns3s6'        

                }
               
              ]
              

        })

        await camp.save();
    }
   
}

seedDB().then( () => {
mongoose.connection.close();

})