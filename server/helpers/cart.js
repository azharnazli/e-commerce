const Cart = require('../models/cart')

module.exports = {
  removeCart() {
    before(function(done){
      Cart.deleteMany()
        .then(()=> {
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}