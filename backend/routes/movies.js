const express = require('express')
const router = express.Router()

const apikey = '71e6ed6ac08904aa474f7f8037d76079'
const baseurl = 'https://api.themoviedb.org/3/movie/157336'
// ?api_key=71e6ed6ac08904aa474f7f8037d76079

movies = [
    {id: 1, name: "New Hope"},
    {id: 2, name: "World War Z"}
]

router.get('/', (req, res) => {
    // res.json(movies)

    fetch(`${baseurl}?api_key=${apikey}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        res.json(data)
    })
    .catch((error) =>{
        console.log(error)
    })



})


module.exports = router