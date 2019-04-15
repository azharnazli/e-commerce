const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const { removeProduct } = require('../helpers/product')
const User = require('../models/user')
const { sign } = require('../helpers/jwt')

chai.use(chaiHttp)

//variable Global

  removeProduct()

describe('post success add new product', function () {
  it('should be add new product', function (done) {
    const item = {
      name: 'sepatu',
      description: 'ini sepatu loh',
      price: 10000,
      stock: 5
    }
    chai
      .request(app)
      .post('/product')
      .send(item)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.be.an('object')
        expect(res.body).haveOwnProperty('name')
        expect(res.body).haveOwnProperty('description')
        expect(res.body).haveOwnProperty('price')
        expect(res.body).haveOwnProperty('stock')
        expect(res.body.name).to.be.a('string')
        expect(res.body.description).to.be.a('string')
        expect(res.body.price).to.be.a('number')
        expect(res.body.stock).to.be.a('number')
        done()
      })
  })
})

describe('post fail add product', function () {
  it('should return 400 and object error', function (done) {
    let item = {
      description: [1, 2, 3],
      price: 'sepuluh ribu',
      stock: true
    }
    chai
      .request(app)
      .post('/product')
      .send(item)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.be.an('object')
        expect(res.status).is.equal(400)
        expect(res.body).haveOwnProperty('err')
        done()
      })
  })
})

describe('success get product from database', function () {
  it('should be get all product', function (done) {
    chai
      .request(app)
      .get('/product')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body[0]).haveOwnProperty('name')
        expect(res.body[0]).haveOwnProperty('description')
        expect(res.body[0]).haveOwnProperty('stock')
        expect(res.body[0]).haveOwnProperty('price')
        done()
      })
  })
})

describe('get fail all product', function () {
  it('should be status 400 and object error', function (done) {
    chai
      .request(app)
      .get('/product')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')
        expect(res.body[0]).haveOwnProperty('name')
        expect(res.body[0]).haveOwnProperty('description')
        expect(res.body[0]).haveOwnProperty('stock')
        expect(res.body[0]).haveOwnProperty('price')
        done()
      })
  })
})