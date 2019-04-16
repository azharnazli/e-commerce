const routes = require('express').Router()
const CartController = require('../../controllers/CartController')
const authenticated = require('../../middlewares/authenticated')

routes.use(authenticated)

routes.post('/', CartController.createCart)
routes.delete('/:cartId', CartController.deleteCart)


module.exports = routes