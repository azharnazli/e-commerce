const Product = require('../models/product')

class ProductController{

  static createProduct(req, res) {
    Product.create(req.body)
      .then((product)=> {
        res.status(201).json(product)
      })
      .catch(err => {
        if(err.name == 'CastError' || err.name == 'ValidationError') {
          res.status(400).json({ err : err.message})
        } else {
          console.log(err)
          res.status(500).json(err)
        }
      })
  }

  static getAllProduct(req, res) {
    Product.find()
      .then((products) => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}


module.exports = ProductController