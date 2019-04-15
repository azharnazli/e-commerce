const User = require('../models/user')

module.exports = {
  removeUser: function () {
    before(function (done) {
      User.deleteMany({})
        .then((user) => {
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
}