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
            Item.deleteMany({}, err => {
                if (err) return done(err)
                done()
            })
        })
    
        it('POST item works', function(done) {
            chai.request(server)
                .post('/api/items')
                .send({ name: 'Puff-puff' })
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

    describe('Test GET endpoint api/items', function() {
        it('GET items endpoint works', (done) => {
            chai.request(server)
                .get('/api/items')
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res).to.have.status(200)
                    expect(res.body).to.not.be.empty
                    expect(res.body).to.be.an('array')
                    return done()
                })
        })
    })

    describe('Test GET endpoint api/items/:id', function() {
        it('GET item endpoint works', function(done) {
            let newItem = new Item({name: 'Bole'})
            newItem.save((err, item) => {
                chai.request(server)
                    .get('/api/items/' + item._id)
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res).to.have.status(200)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('name').to.be.equal('Bole')
                        done()
                    })
            })
        })
        it('GET item endpoint fails if id param is invalid')
    })

    describe('Test PUT endpoint api/items/:id', function() {
        it('PUT endpoint works', function(done) {
            let newItem = new Item({name: 'Kuli-kuli'})
            newItem.save((err, item) => {
                chai.request(server)
                    .put('/api/items/' + item._id)
                    .send({ name: 'Mango' })
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res).to.have.status(201)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('name').to.be.equal('Mango')
                        done()
                    })
            })
        })
        it('PUT endpoint fails when id param is omitted')
        it('PUT endpoint fails when name is omitted in req.body')
    })

    describe('Test DELETE endpoint api/items/:id', function() {
        it('DELETE endpoint works', function(done) {
            let newItem = new Item({name: 'Vitamilk'})
            newItem.save((err, item) => {
                chai.request(server)
                    .delete('/api/items/' + item._id)
                    .end((err, res) => {
                        if (err) return done(err)
                        expect(res).to.have.status(201)
                        expect(res).to.be.an('object')
                        expect(res.body).to.have.property('name').to.be.equal('Vitamilk')
                        done()
                    })
            })
        })
        it('DELETE endpoint fails when id param is omitted')
    })
})