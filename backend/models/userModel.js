const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    movieId: Number,
    rating: Number,
});

const userSchema = new Schema({
    username: String,
    password: String,
    ratings: [ratingSchema],
})

const User = mongoose.model('User', userSchema);

module.exports = User
