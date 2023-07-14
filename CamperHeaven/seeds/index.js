const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20000) + 1000;
        const camp = new Campground({
            author: '64a9894526add6083c995c51',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dvda6on2q/image/upload/v1689357088/CamperHeaven/iprsrlihaxmaqvdkae3c.jpg',
                    filename: 'CamperHeaven/iprsrlihaxmaqvdkae3c'
                },
                {
                    url: 'https://res.cloudinary.com/dvda6on2q/image/upload/v1689357090/CamperHeaven/phijr3pkzay4qgxc029x.jpg',
                    filename: 'CamperHeaven/phijr3pkzay4qgxc029x'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa atque, amet ullam id quas, porro dolorem dicta possimus, odio quod reiciendis. Quidem tempora libero possimus totam, nam nesciunt officiis officia.',
            price
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})