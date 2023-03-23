const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/tweets', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database Connected");
});

//-------------------------------------------------------------------------------//

const userSchema = new Schema({
    username: String,
    age: Number
})

const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

const User = mongoose.model('User', userSchema);
const Tweet = mongoose.model('Tweet', tweetSchema);

// const makeTweets = async () =>{
//     // const u = new User({username: 'AhmadCrisp', age: 21})
//     const u = await User.findOne({username: 'AhmadCrisp'})
//     const tweet2 = new Tweet({text: 'What comes first? Egg or the Chicken?', like: 1003})
//     tweet2.user = u;
//     u.save();
//     tweet2.save();
// }
const findTweet = async () => {
    const t = await Tweet.findOne({}).populate('user', 'username')
    console.log(t);
}
findTweet();