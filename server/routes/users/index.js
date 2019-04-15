const routes = require('express').Router()
const UserController = require('../../controllers/UserController')

routes.post('/register', UserController.createUser )

module.exports = routes