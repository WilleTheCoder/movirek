const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const User = require('./models/userModel')

const app = express()

app.use(bodyParser.json())
app.use(cors())

//database
const conn_str = `mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.kqpocvf.mongodb.net/movirek?retryWrites=true&w=majority`

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

async function main() {
    try {
        console.log('Connecting..')
        // Connect to the database
        await connectDb();

    } catch (error) {
        console.error("Error connection to db:", error);
    }
}

main()

// api routes
const moviesRoutes = require('./routes/movies')
app.use('/', moviesRoutes)

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

