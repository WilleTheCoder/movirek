### frontend

npx create-react-app movirek

npm start

npm install --save font-awesome

ROUTE

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


styling

flexbox: https://www.youtube.com/watch?v=phWxA89Dy94
grid: https://www.youtube.com/watch?v=EiNiSFIPIQE

### backend

npm init

npm install express mongoose body-parser cors

node app.js

enviroment variables dotenv: https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/

MONGOOSE:

import: 
const mongoose = require('mongoose')

find conn_string: 
const conn_str = `mongodb+srv://admin:$<password>@cluster0.kqpocvf.mongodb.net/<database>?retryWrites=true&w=majority`
connect to db:
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

create file .models/userModel:

    const mongoose = require('mongoose');
    const Schema = mongoose.Schema;

    const userSchema = new Schema({
        id: Number,
        username: String,
        password: String
    })

    const User = mongoose.model('User', userSchema);

    module.exports = User



POST
  const User = require('./models/userModel)

    const newUser = new User ({
      id: 1,
      username: 'kalle',
      password: 'cool123'
    })

    newUser.save();



USEREF

import React, {useRef} from 'react'

const usernameRef = useRef()
..
<input ref={usernameRef}></input>

Retrieve value: usernameRef.current.value




## TODO

- Sign up, login and authentication
- UI X
- Fetch data via API about movies series X
  - Title
  - Year
  - Image
  - Category
  - Length
  - Actors
  - Director 
  - Description

- Page for each movie item
  - Rate if logged in
  - Imdb rating
  - See description

- Create a custom score based on activity on page 1 - 100 popcorn - higher score more bigger difference
- Based on ratings recommend other movies
- For each user keep track of what movies they like and recommend other likely ones.
- Create an account
  - Create lists
  - Add to lists
  - Rate movies

- Filter movies, series, year, popular etc


SIGNUP
- skriv in username och password
- kontroll att det inte redan finns etc
- registrera sig -> 
- lägger in dom i databasen med username, password(hashed)

LOGIN
- skriv in användarnamn och lösen
- se om password stämmer överens med username




### api
https://developer.themoviedb.org/reference/intro/getting-started
https://developer.themoviedb.org/reference/discover-movie

endpoints

crew and cast
https://api.themoviedb.org/3/movie/565770/credits

budget, genres, homepage, revenue, runtime, spoken_languages, tagline
https://api.themoviedb.org/3/movie/565770

