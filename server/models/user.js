const mongoose = require('mongoose')
const Schema = require('mongoose').Schema
const {
  hash
} = require('../helpers/brcypt')

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    minlength : [3 , 'first name character min is 3'],
    maxlength : [20 , 'first name character max is 20']
  },
  last_name: {
    type: String,
    required: true,
    minlength : [3 , 'last name character min is 3'],
    maxlength : [20 , 'last name character max is 20']
  },
  password: {
    type: String,
    required: true,
    minlength : [7 , 'password character min is 7'],
    maxlength : [20 , 'password character max is 20']
  },
  email: {
    type: String,
    required: true,
    validate :  [{
      validator: function(value) {
        return User.findOne({
          email  : value,
          _id : {
            $ne :  this.id
          }
        })
          .then((found) => {
            if(found) return false
          })
      }, message : 'email already registered'
    },{
      validator : function(value) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(value).toLocaleLowerCase())
      },
      message: `email format error`
    }]
  },
  roles : {
    type : String,
  }
})

UserSchema.pre('save', function (next) {
  this.password = hash(this.password)
  this.roles = 'user'
  next()
})

let User = mongoose.model('User', UserSchema)
module.exports = User