const express = require('express')

//setup express app
const app = express();

const items = require('./routes/api/items')

//use express bodyParser
app.use(express.json())

//use items router for api/items endpoint
app.use('/api/items', items)


module.exports = app

