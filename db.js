const mongoose = require('mongoose')

//setup mongoDB
function connect() {
    const keys = require('./config/keys')
    return new Promise((resolve, reject) => {
        if(process.env.NODE_ENV === 'test') {
            mongoose
                .connect(keys.mongoTestURI, {useNewUrlParser: true, useUnifiedTopology: true})
                .then((res, err) => {
                    if (err) return reject(err)
                        resolve()
                        //console.log('MongoDB connected')
                     
                })
                
        } else {
            mongoose
                .connect(keys.mongoDevURI, {useNewUrlParser: true, useUnifiedTopology: true})
                .then((res, err) => {
                    if (err) return reject(err)
                    resolve()
                    console.log('MongoDB connected')
                     
                })
                .catch(err => console.log(`Error: ${err}`))
        }
    })
}

function close() {
    return mongoose.disconnect()
}

module.exports = {
    connect: connect,
    close: close
}