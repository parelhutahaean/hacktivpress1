var express = require('express')
var router = express.Router()

var userController = require('../controllers/user')

router.get('/', (req, res) => {
  res.send('Alive')
})

// NOTE: Users API
router.post('/signup', userController.signup)
router.post('/signin', userController.signin)
//router.delete('/:id', userController.delete)

module.exports = router;
