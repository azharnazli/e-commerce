const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CartSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required : true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required : true
  }
})

const Cart = mongoose.model('Cart', CartSchema)

module.exports = Cart