const Product = require('../models/product')

module.exports = {
  removeProduct: function () {
    before(function (done) {
      Product.deleteMany({})
        .then((product) => {
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}