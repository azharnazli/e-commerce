const routes = require('express').Router()
const ProductController = require('../../controllers/ProductController')
const authenticated = require('../../middlewares/authenticated')
const authorize = require('../../middlewares/authorize')

//middleware
routes.get('/', ProductController.getAllProduct)

routes.use(authenticated)
routes.post('/',authorize, ProductController.createProduct)
routes.put('/:productId',authorize, ProductController.editProduct)
routes.delete('/:productId',authorize, ProductController.deleteProduct)

module.exports = routes