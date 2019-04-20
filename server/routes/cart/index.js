const routes = require('express').Router()
const CartController = require('../../controllers/CartController')
const authenticated = require('../../middlewares/authenticated')

routes.use(authenticated)

routes.post('/', CartController.createCart)
routes.patch('/:productId', CartController.editCartQuantity)
routes.post('/checkout', CartController.checkoutCart)
routes.get('/', CartController.findMyCart)


module.exports = routes