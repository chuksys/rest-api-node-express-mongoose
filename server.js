const db = require('./db')
const app = require('./app')

//setup mongoDB
db.connect().then(() => {
    //define port number
    const port = process.env.PORT || 3000

    //start server and listen to server requests
    app.listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => console.log(`Error: ${err}`))

module.exports = app