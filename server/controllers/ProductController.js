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

  static editProduct( req, res) {
    Product.findOneAndUpdate({_id : req.params.productId}, req.body, {new : true, runValidators:true})
    .then(editedProduct => {
      res.status(200).json(editedProduct)
    })
    .catch(err => {
      if(err.errors) {
        res.status(400).json({ err : err.errors})
      } else {
        res.status(500).json(err)
      }
    })
  }

  static deleteProduct(req, res) {
    Product.findOneAndDelete({_id : req.params.productId})
      .then((product) => {
        res.status(200).json(product)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}


module.exports = ProductController