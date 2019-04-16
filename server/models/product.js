const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    required : [true, `please insert product name`]
  },
  price: {
    type: Number,
    required : [true, `please insert product price`],
    min : [1, 'price cant be lower than 1']
  },
  stock: {
    type: Number,
    required : [true, `please insert product stock`],
    min : [0, 'stock cant be lower than 0']
  },
  description: {
    type: String,
    required : [true, `please insert product description`],
    minlength : [10, 'minimal character is 10']
  },
  image : {
    type : String,
  }
})

ProductSchema.pre('save', function(next) {
  if(this.image == '') this.image = 'https://imgplaceholder.com/640x360'
  next()
})



const Product = mongoose.model('Product', ProductSchema)

module.exports = Product