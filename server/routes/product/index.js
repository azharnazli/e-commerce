const routes = require('express').Router()
const ProductController = require('../../controllers/ProductController')
const authenticated = require('../../middlewares/authenticated')

//middleware

routes.post('/', ProductController.createProduct)
routes.get('/', ProductController.getAllProduct)

module.exports = routes