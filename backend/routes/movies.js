const express = require('express')
require('dotenv').config()
const User = require('../models/userModel')

const router = express.Router()
const baseurl = 'https://api.themoviedb.org/3/movie/157336'

router.get('/popular', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log("fetching!!")
    url = 'https://api.themoviedb.org/3/movie/popular'
    fetch(`${url}?page=${page}&api_key=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log(error)
        })
})


router.get('/details', (req, res) => {
    console.log("Fetching movie details");
    const movie_id = req.query.movie_id

    fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            res.json(data)
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/postNewAccount', (req, res) => {
    console.log("posting")

    newUser = new User({
        username: req.body.username,
        password: req.body.password,
    })

    newUser.save()

    res.json({ mesage: "New Account Created Successfully!" })
})


router.get('/getUserStatus', (req, res) => {
    console.log("username:", req.query.username)

    const query = User.find({ username: req.query.username }).exec()

    query.then((user) => {
        if (user.length > 0) {
            res.json({ status: true })
        } else {
            res.json({ status: false })
        }
    })
        .catch((error) => {
            console.log(error)
            res.json({ status: false })
        })
})


module.exports = router