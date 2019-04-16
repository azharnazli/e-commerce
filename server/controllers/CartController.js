const  Cart = require('../models/cart')

class CartController {

  static createCart( req, res) {
    Cart.create(req.body)
      .then(cart => {
        res.status(201).json(cart)
      })
      .catch(err => {
        if(err.errors.productId || err.errors.userId) {
          res.status(400).json({ err : err.errors})
        }else {
          res.status(500).json(err)
        }
      })
  }

  static deleteCart( req, res) {
    Cart.deleteOne({_id : req.body.cartId})
      .then((cart)=> {
        res.status(200).json(cart)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }


}

module.exports  = CartController