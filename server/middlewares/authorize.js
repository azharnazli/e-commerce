const User = require('../models/user')

module.exports = (req, res, next) => {
  User.findById(req.authenticated._id)
    .then((found) => {
      if(found.roles == 'admin') {
        next()
      } else {
        res.status(401).json({ err : 'Authorization Error'})
      }
    })
}