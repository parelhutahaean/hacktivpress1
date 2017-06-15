var User = require('../models/user')
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var methods = {}

methods.signup = (req, res) => {
  User.create({
    username: req.body.username,
    password: passwordHash.generate(req.body.password)
  })
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

methods.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
  .then(data => {
    if (data === null) {
      res.send('User not found')
    } else {
      if (passwordHash.verify(req.body.password, data.password)) {
        var token = jwt.sign({
          username : data.username,
          _id: data._id
        }, process.env.SECRET, {
          expiresIn : '3h'
        })
        res.send({token})
      } else {
        res.send({err: 'Password unmatch'})
      }
    }
  })
}

methods.delete = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    user.remove((err, result) => {
      if (err) res.send(err)
      res.send(result)
    })
  })
}

module.exports = methods
