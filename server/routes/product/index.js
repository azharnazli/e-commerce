const routes = require('express').Router()
const ProductController = require('../../controllers/ProductController')
const authenticated = require('../../middlewares/authenticated')
const authorize = require('../../middlewares/authorize')

//middleware
routes.use(authenticated, authorize)

routes.post('/', ProductController.createProduct)
routes.get('/', ProductController.getAllProduct)
routes.put('/:productId', ProductController.editProduct)
routes.delete('/:productId', ProductController.deleteProduct)

module.exports = routes