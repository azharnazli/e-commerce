const routes = require('express').Router()
const UserController = require('../../controllers/UserController')

routes.post('/register', UserController.createUser )
routes.post('/login', UserController.loginUser )
routes.post('/verify', UserController.verifyToken )

module.exports = routes