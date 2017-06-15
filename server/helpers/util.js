'use strict';

var jwt = require('jsonwebtoken');
var util = {};

util.isValidUser = (req, res, next) => {
  jwt.verify(req.headers.token, 'secret', (err, decoded) => {
    if (decoded) {
      req.decoded = decoded
      next()
    } else {
      res.send(err)
    }
  })
}

module.exports = util;
