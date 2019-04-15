const app = require('../app')
const chai = require('chai')
const chaiHttp = require('chai-http');
const expect = chai.expect
const {removeUser } = require('../helpers/user')

chai.use(chaiHttp);

removeUser()

describe('post success add new user', function () {
  it('should be register a user', function (done) {
    let user = {
      first_name: 'azhar',
      last_name: 'nazli',
      email: 'azhar@gmail.com',
      password: '1234567',
    }
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.body).to.be.an('object')
        expect(res.body).haveOwnProperty('email')
        expect(res.body).haveOwnProperty('password')
        expect(res.body.password).not.equal(user.password)
        expect(res.body).haveOwnProperty('first_name')
        expect(res.body).haveOwnProperty('last_name')
        done()
      })
  })
})

describe('post fail register user', function () {
  it('should be return 400 and object error first_name', function (done) {
    let user = {
      first_name: '',
      last_name: 'nazli',
      email: 'azhar@gmail.com',
      password: '1234567',
    }
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.status).is.equal(400)
        expect(res.body).to.be.an('object')
        expect(res.body).haveOwnProperty('error')
        done()
      })
  })
})

describe('post fail register user', function () {
  it('should be return 400 and object error last_name', function (done) {
    let user = {
      first_name: 'azhar',
      last_name: '',
      email: 'azhar@gmail.com',
      password: '1234567',
    }
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.status).is.equal(400)
        expect(res.body).to.be.an('object')
        expect(res.body).haveOwnProperty('error')
        done()
      })
  })
})

describe('post fail register email', function () {
  it('should be return 400 and object error email', function (done) {
    let user = {
      first_name: 'azhar',
      last_name: 'nazli',
      email: '',
      password: '1234567',
    }
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.status).is.equal(400)
        expect(res.body).to.be.an('object')
        expect(res.body).haveOwnProperty('error')
        done()
      })
  })
})

describe('post fail register password', function () {
  it('should be return 400 and object error password', function (done) {
    let user = {
      first_name: 'azhar',
      last_name: 'nazli',
      email: 'mazhar@gmail.com',
      password: '',
    }
    chai
      .request(app)
      .post('/users/register')
      .send(user)
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res.status).is.equal(400)
        expect(res.body).to.be.an('object')
        expect(res.body).haveOwnProperty('error')
        done()
      })
  })
})

describe('success post login user',function() {
  it('should be login a user ', function(done){
    let user = {
      email: 'azhar@gmail.com',
      password: '1234567',
    }
    chai
        .request(app)
        .post('/users/login')
        .send(user)
        .end(function(err, res){
          console.log(res.body)
          expect(err).to.be.null
          expect(res.body).to.be.an('object')
          done()
        })
  })
})