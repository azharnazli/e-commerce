const chai = require('chai')
const  chaiHttp = require('chai-http')
const app = require('../app')
const expect = chai.expect
const  { removeCart } = require('../helpers/cart')

removeCart()

let token = ''
let productId = ''
let userId = ''
let cartId = ''

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
        userId = res.body._id
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

before('createProduct', function(done) {
  let item = {
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
    productId = res.body._id
      done()
    })
})



describe('post success create new cart', function(){
  it('should be create new cart', function(done) {
    let item = {
      userId,
      productId,
      quantity : 2
    }
    chai
        .request(app)
        .post('/cart')
        .send(item)
        .set({token})
        .end(function(err, res) {
          expect(res.status).to.equal(201)
          expect(res.body).haveOwnProperty('userId')
          expect(res.body).haveOwnProperty('productId')
          cartId = res.body._id
          done()
        })
  })
})

describe('post success delete cart', function(){
  it('should be delete a cart', function(done) {
    chai
        .request(app)
        .delete('/cart/' )
        .set({token})
        .end(function(err, res) {
          expect(res.status).to.equal(200)
          done()
        })
  })
})

describe('post fail delete cart', function(){
  it('should be fail delete a cart', function(done) {
    chai
        .request(app)
        .delete('/cart/')
        .end(function(err, res) {
          expect(res.status).to.equal(401)
          done()
        })
  })
})