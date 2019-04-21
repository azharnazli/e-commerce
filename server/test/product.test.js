const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const { removeProduct } = require('../helpers/product')

chai.use(chaiHttp)

//variable Global
let token = ''
let productId = ''

removeProduct()
before('createUser', function(done) {
  let user = {
    email: 'martin@gmail.com',
    password: '1234567',
    first_name: 'martin',
    last_name: 'suhendra',
    roles : 'admin'
  }
  chai
      .request(app)
      .post('/users/register')
      .send(user)
      .end(function(err, res) {
        expect(err).to.be.null
        done()
      })
})
before('loginUser', function(done){
  let user = {
    email: 'martin@gmail.com',
    password: '1234567',
  }
  chai
      .request(app)
      .post('/users/login')
      .send(user)
      .end(function(err, res) {
        expect(err).to.be.null
        token = res.body.token
        done()
      })
})

describe('post success add new product', function () {
  it('should be add new product', function (done) {
    const item = {
      name: 'sepatu',
      description: 'ini sepatu loh',
      price: 10000,
      stock: 5,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
      .request(app)
      .post('/products')
      .send(item)
      .set({token})
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
        productId = res.body._id
        done()
      })
  })
})

describe('post fail add product name', function () {
  it('should return 400 and object error', function (done) {
    let item = {
      name : '',
      description: 'ini sepatu loh',
      price: 10000,
      stock: 5,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
      .request(app)
      .post('/products')
      .send(item)
      .set({token})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).haveOwnProperty('err')
        expect(res.status).to.equal(400)
        done()
      })
  })
})

describe('post fail add product description', function () {
  it('should return 400 and object error', function (done) {
    let item = {
      name : 'sepatu',
      description: '',
      price: 10000,
      stock: 5,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
      .request(app)
      .post('/products')
      .send(item)
      .set({token})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).haveOwnProperty('err')
        expect(res.status).to.equal(400)
        done()
      })
  })
})


describe('post fail add product price lower than 1', function () {
  it('should return 400 and object error', function (done) {
    let item = {
      name : 'sepatu',
      description: 'ini sepatu loh',
      price: -1,
      stock: 5,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
      .request(app)
      .post('/products')
      .send(item)
      .set({token})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).haveOwnProperty('err')
        expect(res.status).to.equal(400)
        done()
      })
  })
})

describe('post fail add product stock lower than 0', function () {
  it('should return 400 and object error', function (done) {
    let item = {
      name : 'sepatu',
      description: 'ini sepatu loh',
      price: 10000,
      stock: -1,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
      .request(app)
      .post('/products')
      .send(item)
      .set({token})
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).haveOwnProperty('err')
        expect(res.status).to.equal(400)
        done()
      })
  })
})


describe('success get product from database', function () {
  it('should be get all product', function (done) {
    chai
      .request(app)
      .get('/products')
      .set({token})
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

describe('put success edit product', function() {
  it('should be edit a product', function(done) {
    let item = {
      name : 'baju',
      description : 'ini beneran baju',
      price : 20000,
      stock : 2,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
        .request(app)
        .put('/products/'+ productId)
        .send(item)
        .set({token})
        .end(function( err , res) {
          expect(err).to.be.null
          expect(res.body).to.be.an('object')
          expect(res.body).haveOwnProperty('name')
          expect(res.body).haveOwnProperty('image')
          expect(res.body).haveOwnProperty('description')
          expect(res.body).haveOwnProperty('price')
          expect(res.body).haveOwnProperty('stock')
          expect(res.status).to.be.equal(200)
          done()
        })
  })
})


describe('put fail edit product name', function() {
  it('should be edit a product', function(done) {
    let item = {
      name : '',
      description : 'ini beneran baju',
      price : 20000,
      stock : 2,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
        .request(app)
        .put('/products/'+ productId)
        .send(item)
        .set({token})
        .end(function( err , res) {
          expect(err).to.be.null
          expect(res.body).to.be.an('object')
          expect(res.body).to.be.an('object')
          expect(res.body.err).to.be.an('object')
          expect(res.status).to.be.equal(400)
          done()
        })
  })
})

describe('put fail edit product description', function() {
  it('should be edit a product', function(done) {
    let item = {
      name : 'baju',
      description : '',
      price : 20000,
      stock : 2,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
        .request(app)
        .put('/products/'+ productId)
        .send(item)
        .set({token})
        .end(function( err , res) {
          expect(err).to.be.null
          expect(res.body.err).to.be.an('object')
          expect(res.body.err.description).haveOwnProperty('message')
          expect(res.status).to.be.equal(400)
          done()
        })
  })
})

describe('put fail edit product price', function() {
  it('should be edit a product', function(done) {
    let item = {
      name : 'baju',
      description : 'ini baju loh',
      price : -1,
      stock : 2,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
        .request(app)
        .put('/products/'+ productId)
        .send(item)
        .set({token})
        .end(function( err , res) {
          expect(err).to.be.null
          expect(res.body.err).to.be.an('object')
          expect(res.body.err.price).haveOwnProperty('message')
          expect(res.status).to.be.equal(400)
          done()
        })
  })
})

describe('put fail edit product stock', function() {
  it('should be edit a product', function(done) {
    let item = {
      name : 'baju',
      description : 'ini baju loh',
      price : 1000,
      stock : -1,
      image : 'https://imgplaceholder.com/640x360'
    }
    chai
        .request(app)
        .put('/products/'+ productId)
        .send(item)
        .set({token})
        .end(function( err , res) {
          expect(err).to.be.null
          expect(res.body.err).to.be.an('object')
          expect(res.body.err.stock).haveOwnProperty('message')
          expect(res.status).to.be.equal(400)
          done()
        })
  })
})

describe('delete success delete a product', function() {
  it('should be delete a product', function(done) {
    chai
        .request(app)
        .delete('/products/'+ productId)
        .set({token})
        .end(function(err , res) { 
          expect(err).to.be.null
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.equal(200)
          done()
        })
  })
})

describe('delete fail  delete a product', function() {
  it('should be delete a product', function(done) {
    chai
        .request(app)
        .delete('/products/'+ productId)
        .end(function(err , res) { 
          expect(err).to.be.null
          expect(res.body).to.be.an('object')
          expect(res.status).to.be.equal(401)
          done()
        })
  })
})