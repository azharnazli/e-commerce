const User = require('../models/user')

class UserController {

  static createUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch(err => {
        if(err.errors.first_name) {
          res.status(400).json({error : err.errors.first_name.message})
        }else if (err.errors.last_name) {
          res.status(400).json({error : err.errors.last_name.message})
        }else if (err.errors.email) {
          res.status(400).json({error : err.errors.email.message})
        }else if (err.errors.password) {
          res.status(400).json({error : err.errors.password.message})
        }
         else{
          res.status(500).json(err)
        }
      })
  }
}

module.exports = UserController