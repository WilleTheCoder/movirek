# MOVIREK

# Frontend
**Init react app**

      npx create-react-app movirek
      npm start


## Route

    npm install react-router-dom

      import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

      function App() {
        return (
          <Router>
            <Routes>
              <Route exact path='/' element={<Main></Main>}></Route>
              <Route exact path='/register' element={<Register></Register>}></Route>
            </Routes>
          </Router>
        );
      }


## Styling

### Flexbox and Grid:
    https://www.youtube.com/watch?v=phWxA89Dy94
    https://www.youtube.com/watch?v=EiNiSFIPIQE

### Fontawesome

    npm i --save @fortawesome/free-solid-svg-icons
    npm i --save @fortawesome/free-regular-svg-icons
    npm i --save @fortawesome/free-brands-svg-icons


----
# Backend

## init Express
    npm i
---

    const express = require('express')
    const app = express()

    app.get('/', (req, res) => {
        res.json('Hello World')
    })

    app.listen(3000, () => {
        console.log('listen');
    })



## JWT Authentication
    https://www.permify.co/post/jwt-authentication-in-react/
      npm install jsonwebtoken

## API Endpoints

    https://developer.themoviedb.org/reference/intro/getting-started
    https://developer.themoviedb.org/reference/discover-movie

**Crew and Cast**

    https://api.themoviedb.org/3/movie/565770/credits

**Budget, Genres, Homepage, Revenue, Runtime, Spoken_languages, Tagline**

    https://api.themoviedb.org/3/movie/565770


## Database
Mongodb cloud

    https://cloud.mongodb.com/v2/6516cdf25c824f214caf4bb4#/metrics/replicaSet/6516cee06308ac7e3a420742/explorer/movirek/users/find

npm install express mongoose body-parser cors

import: 
const mongoose = require('mongoose')

    async function connectDb() {
          try {
              await mongoose.connect(conn_str, {
                  useNewUrlParser: true,
                  useUnifiedTopology: true,
              });

              console.log('connected')
          } catch (error) {
              console.log(error)
          }
      }

**Create file: .models/userModel:**

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        id: Number,
        username: String,
        password: String
    })

    const User = mongoose.model('User', userSchema);

    module.exports = User

**POST**

    const User = require('./models/userModel)

      const newUser = new User ({
        id: 1,
        username: 'kalle',
        password: 'cool123'
      })

      newUser.save();

# Other

## USEREF

    import React, {useRef} from 'react'

    const usernameRef = useRef()
    ..
    <input ref={usernameRef}></input>

    Retrieve value: usernameRef.current.value

## DOTENV
**enviroment variables dotenv**

      https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/
----


# TODO

## Registration
- [x] Enter a Username and Password
- [x] Check if the username already exists
- [x] Register with the provided credentials
- [x] Store the information in the database with a hashed password

## Login

- [x] Enter your Username and Password
- [x] Verify if the password matches the username
- [x] Generate JWT token and send back to frontend

## API
- [x] **Fetch Data via API about Movies and Series**
  - Title 
  - Year
  - Image
  - Category
  - Length
  - Actors
  - Director 
  - Description

- [x] **Page for Each Movie Item**

## Account Features
**GENERAL**

- [x] Create Lists
- [ ] Recommended Movies (AI)
- [ ] Find Movie to Watch (AI)
- [ ] Achievements: e.g., Rated 10 Movies, Made a List ➡️ Level Up (XP)
- [ ] Add favorite movie
- [ ] Profile stats: overall rating, number of rated movies
- [ ] Profile Level (XP)
- [ ] Graph data i.e rating distribution
  
**RATING**
- [x] Rate Movies: 1 - 100 Popcorn 🍿
- [ ] Many rating categories i.e comedy, scaryness, story

## User profile
- [ ] Add favorite movie
- [ ] User profile picture

## Filter
- [ ] Search for movies and series
- [ ] Filter Movies, Series, Year, Popular, etc

## Misc
- [ ] Make UI look good
- [ ] Make UI responsive
- [ ] Add wall to auth pages

## Page
- [x] Rate the movie *
  - Rate window
  - Close window
  - submit rating 1-100
  - send to backend and put in database
- [x] Add the movie to a list 
- [ ] Remove a movie from the list 
- [ ] Add to favorites
- [ ] Add trailer

# Ideas
Seperate rating for different classes: 
- comedy rating
- story rating
- scary rating

Popcorn sound when rating, depending on how many pops
Fill popcorn box with the rating number pop

Leaderboard: how many movies rated, comments
Critical level depending on the ratings
Influence level
Level 

for mobile REACT NATIVE


Let's create an amazing movie app! 🎥🍿