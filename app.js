const express = require('express')
const mongoose = require('mongoose')
const items = require('./routes/api/items')

//setup express app
const app = express();

//setup mongoDB
const db = require('./config/keys').mongoURI
mongoose
    .connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(`Error: ${err}`))

//use express bodyParser
app.use(express.json())

//use items router for api/items endpoint
app.use('/api/items', items)

//define port number
const port = process.env.PORT || 3000

//start server and listen to server requests
app.listen(port, () => console.log(`Listening on port ${port}`))