const User = require('../models/user')
const { compare }  = require('../helpers/brcypt')
const { sign } = require('../helpers/jwt')

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
  
  static loginUser(req, res) {
    User.findOne({
      email : req.body.email
    })
      .then((found) => {
        if(!found) {
          res.status(401).json({err : 'username or password not found'})
        }else {
          if(!compare(req.body.password, found.password)) {
            res.status(401).json({err : 'username or password not found'})
          } else {
            let token = sign({
              email :found.email,
             _id :  found._id,
            })
            res.status(200).json({token})
          }
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = UserController