var User = require('../models/user')
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var methods = {}

methods.getAll = (req, res) => {
  User.find({}, (err, data) => {
    if (err) res.send(err)
    res.send(data)
  })
}

methods.getById = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) res.send(err)
    res.send(data)
  })
}

methods.insert = (req, res) => {
  User.create(req.body)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

methods.update = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) res.send(err)
    data.username = req.body.username || data.username
    data.password = passwordHash.generate(req.body.password) || data.password
    data.save(err2 => {
      if (err2) res.send(err2)
      res.send(data)
    })
  })
}

methods.delete = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) res.send(err)
    data.remove(err2 => {
      if (err2) res.send(err2)
      res.send(data)
    })
  })
}

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
          role : data.role
        }, 'secret', {
          expiresIn : '3h'
        })
        res.send(token)
      } else {
        res.send('Password unmatch')
      }
    }
  })
}

module.exports = methods
