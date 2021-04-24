const express = require('express')
const items = require('./routes/api/items')

const app = express();

app.use(express.json())
app.use('/api/items', items)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))