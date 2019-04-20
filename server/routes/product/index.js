const routes = require('express').Router()
const ProductController = require('../../controllers/ProductController')
const authenticated = require('../../middlewares/authenticated')
const authorize = require('../../middlewares/authorize')
const gcsMiddlewares = require('../../middlewares/google-cloud-storage')
const multer = require('../../helpers/multer')


//middleware
routes.get('/', ProductController.getAllProduct)

routes.use(authenticated)
routes.post('/',multer.single('image'),gcsMiddlewares.sendUploadToGCS, authorize, ProductController.createProduct)
routes.put('/:productId',multer.single('image'),gcsMiddlewares.sendUploadToGCS, authorize, ProductController.editProduct)
routes.get('/:productId',authorize, ProductController.getProduct)
routes.delete('/:productId',authorize, ProductController.deleteProduct)

module.exports = routes