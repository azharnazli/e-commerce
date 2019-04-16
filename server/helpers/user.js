const User = require('../models/user')

module.exports = {
  removeUser: function () {
    after(function (done) {
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