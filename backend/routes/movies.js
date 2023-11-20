const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const router = express.Router()
const baseurl = 'https://api.themoviedb.org/3/movie/157336'

// exteral

// get movie search results
router.get('/search', (req, res) => {
    console.log('search for movies');
    console.log(req.query.search_query);
    console.log(req.query.page);
    url = `https://api.themoviedb.org/3/search/movie?query=${req.query.search_query}&include_adult=false&page=${req.query.page}`;
    fetch(`${url}&api_key=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log(error)
        })
})

// get popular movies
router.get('/popular', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    url = 'https://api.themoviedb.org/3/movie/popular'
    fetch(`${url}?page=${page}&api_key=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            res.json(data)
        })
        .catch((error) => {
            console.log(error)
        })
})

//get all genres
router.get('/genres', (req, res) => {
    console.log("fetching genres");
    url = "https://api.themoviedb.org/3/genre/movie/list"
    fetch(`${url}?api_key=${process.env.API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
        res.json(data)
    })
    .catch((error) => {
        console.log(error)
    })
})

// get more details about a movie
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

// get recommended movies based on movie
router.get('/recommendedMovies', (req, res) => {
    console.log('fetching recommended movies')
    const movie_id = req.query.movie_id
    https://api.themoviedb.org/3/movie/385687/similar
    fetch(`https://api.themoviedb.org/3/movie/${movie_id}/similar?api_key=${process.env.API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
            res.json(data)
        })
        .catch((err) => console.log(err))
})

// internal
// attempts to login user
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

//register new account
router.post('/postNewAccount', async (req, res) => {
    try {
        console.log("posting");

        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            ratings: [],
            lists: [],
        });

        await newUser.save();

        res.json({ message: "New Account Created Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//add movie to list

router.post('/addMovieToList', async (req, res) => {
    try {

        console.log('adding movie to list: ', req.body.movie_id);
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            console.log('no user found');
            return res.status(400).json({ error: 'no user found' })
        }

        const lists = user.lists.find((list) => list.listname === req.body.listname)

        if (!lists) {
            console.log('no list');
            return res.status(400).json({ error: 'no list with that name' })
        }

        const movies = lists.movies.find(movie => movie.movieId === req.body.movie_id);

        if (movies) {
            console.log('movie exists');
            return res.status(400).json({ error: 'movie already exists in list' })
        }

        lists.movies.push({ movieId: req.body.movie_id })

        await user.save()

        return res.json({ success: 'movie added to list' })

    } catch (error) {
        return res.status(500).json({ error: 'failed to add movie to list' })
    }
})

// adds a new movie rating for a user
router.post('/ratings', async (req, res) => {
    try {
        console.log(req.body.username, req.body.rating, req.body.movieId);
        console.log('rating movie');

        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json({ error: 'no user found' })
        }

        const rating = user.ratings.find((rating) => rating.movieId === req.body.movieId)

        if (rating) {
            rating.rating = req.body.rating
        } else {
            user.ratings.push({ movieId: req.body.movieId, rating: req.body.rating })
        }

        await user.save();
        return res.json({ success: 'added rating' })

    } catch (error) {
        return res.status(500).json({ error: 'failed to add rating' })
    }
})

// get all users list names
router.get('/getUserLists', async (req, res) => {
    const user = await User.findOne({ username: req.query.username })
    if (!user) {
        return res.status(400).json({ error: 'no user found' });
    }

    const lists = user.lists.map(list => ({
        listname: list.listname,
        movies: list.movies
    }))
    console.log(lists);
    return res.json(lists)
})


// see if user exists
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

// add new list
router.get('/addList', async (req, res) => {
    try {
        console.log(req.query.username);
        console.log(req.query.list_name);

        const user = await User.findOne({ username: req.query.username });
        console.log(user);
        if (!user) {
            return res.status(400).json({ error: 'no user found' })
        }
        console.log("yyaa");
        const listStatus = user.lists.find((key) => key.listname === req.query.list_name)

        if (listStatus) {
            res.json({ err: 'duplicate list name' })
        } else {
            console.log("yyaa");
            user.lists.push({ listname: req.query.list_name, movies: [] })
        }

        await user.save()
        return res.json({ success: 'added list' })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'failed to add rating' })
    }

})


module.exports = router