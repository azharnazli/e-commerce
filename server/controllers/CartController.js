const Cart = require('../models/cart')
const Product = require('../models/product')
class CartController {
  static createCart(req, res) {

    Cart.findOneAndUpdate({
        userId: req.authenticated._id,
        productId: req.body.productId
      }, {}, {
        new: true,
        upsert: true
      })
      .then((newCart) => {
        if(!newCart.quantity) {
          newCart.quantity = req.body.quantity
        } else {
          newCart.quantity += +req.body.quantity
        }
        return newCart.save()
      })
      .then((cart) => {
        res.status(201).json(cart)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static editCartQuantity(req, res) {
    Cart.findOne({
        userId: req.authenticated._id,
        productId: req.body.productId
      })
      .then((cart) => {
        cart.quantity = +cart.quantity + (req.body.quantity)
        if (cart.quantity <= 0) {
          return cart.remove()
        } else {
          return cart.save()
        }
      })
      .then((cart) => {
        res.status(200).json(cart)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static checkoutCart(req, res) {
    Cart.find({
      userId: req.authenticated._id
    })
      .then(cart => {
        
        let promiseCarts = []
        cart.forEach(el => {
          promiseCarts.push(Product.findOneAndUpdate({_id: el.productId}, {$inc: { stock: -el.quantity }}))
        })
        return Promise.all(promiseCarts)
      })
      .then(() => {
        return Cart.deleteMany({
          userId: req.authenticated._id
        })
      })
      .then(() => {

        res.status(200).json({message: 'cart is successfully clear'})
      })
      .catch(err => {
        res.status(400).json(err)
      })

  }

  static findMyCart(req, res) {
    Cart.find({
        userId: req.authenticated._id
      })
      .populate('userId')
      .populate('productId')
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static removeCart(req, res) {
    Cart.deleteMany({userId : req.authenticated._id})
      .then(()=> {
        res.status(200).json({message : 'cart is successfully removed'})
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
}

module.exports = CartController