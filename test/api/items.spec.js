process.env.NODE_ENV = "test"

const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const server = require('../../server')
const Item = require('../../models/Item')


describe('Test item endpoints', function() {
    describe('Test POST endpoint /api/items', function() {
        before(function (done) {
            Item.remove({}, err => {
                if (err) return done(err)
                done()
            })
        })
    
        it('POST item works', function(done) {
            chai.request(server)
                .post('/api/items')
                .send({ name: 'Kuli-kuli' })
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(201)
                    expect(res.body).to.contain.property('_id')
                    expect(res.body).to.contain.property('name')
                    expect(res.body).to.contain.property('date')
                    return done()
                })
        })
    
        it('POST item returns error when empty name parameter is passed', function(done) {
            chai.request(server)
                .post('/api/items')
                .send({ name: ''})
                .end(function(err, res) {
                    if (err) return done(err)
                    expect(res).to.have.status(400)
                    return done()
                })
        })
    
        it('POST item returns error when name parameter is not passed', function(done) {
            chai.request(server)
                .post('/api/items')
                .send()
                .end(function(err, res) {
                    if (err) return done(err)
                    expect(res).to.have.status(400)
                    return done()
                })
        })
    })
})