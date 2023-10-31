const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const router = express.Router()
const baseurl = 'https://api.themoviedb.org/3/movie/157336'

// exteral
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

// external
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

// internal
router.post('/loginUser', (req, res) => {
    console.log('iniating login', req.body.username, req.body.password)

    const query = User.findOne({ username: req.body.username }).exec()
    query.then((user) => {
        if (user) {
            if (user.password === req.body.password) {
                // generate JWT
                const payload = {
                    username: user.password,
                    password: user.username,
                }
                const token = jwt.sign(payload, process.env.JWT_KEY, {
                    expiresIn: '1h',
                })

                res.json({ login_status: true, token: token });
            } else {
                res.json({ login_status: false });
            }
        } else {
            res.json({ login_status: false });
        }
    }).catch((error) => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    });
})


router.post('/postNewAccount', async (req, res) => {
    try {
      console.log("posting");
  
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        ratings: [],
      });
  
      await newUser.save();
  
      res.json({ message: "New Account Created Successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


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

// post rating
router.post('/ratings', async (req, res) => {
    try{
        console.log(req.body.username, req.body.rating, req.body.movieId);
        console.log('rating movie');
    
        const user = await User.findOne({ username: req.body.username });
        if(!user) {
            return res.status(400).json({error: 'no user found'})
        }

        const rating = user.ratings.find((rating) => rating.movieId === req.body.movieId)
    
        if (rating) {
            rating.rating = req.body.rating
        } else {
            user.ratings.push({ movieId: req.body.movieId, rating: req.body.rating })
        }

        await user.save();
        return res.json({success: 'added rating'})

    } catch(error){
        return res.status(500).json({error: 'failed to add rating'})
    }
})


module.exports = router