var Article = require('../models/article')

var methods = {}

methods.getAll = (req, res) => {
  Article.find({})
  .populate('author')
  .exec((err, data) => {
    if (err) res.send(err)
    res.send(data)
  })
}

methods.getById = (req, res) => {
  Article.findById(req.params.id)
  .populate('author')
  .exec((err, data) => {
    if (err) res.send(err)
    res.send(data)
  })
}

methods.getByUserId = (req, res) => {
  Article.find({author: req.params.id})
  .populate('author')
  .exec((err, data) => {
    if (err) res.send(err)
    res.send(data)
  })
}
methods.getByCategory = (req, res) => {
  Article.find({category: req.params.category})
  .populate('author')
  .exec((err, data) => {
    if (err) res.send(err)
    res.send(data)
  })
}

methods.insert = (req, res) => {
  console.log(req.decoded);
  req.body.author = req.decoded._id
  Article.create(req.body)
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.send(err)
  })
}

methods.update = (req, res) => {
  Article.findById(req.params.id)
  .populate('author')
  .exec((err, data) => {
    if (err) res.send(err)
    if (req.decoded._id == data.author._id) {
      data.title = req.body.title || data.title
      data.content = req.body.content || data.content
      data.category = req.body.category || data.category
      data.save(err2 => {
        if (err2) res.send(err2)
        res.send(data)
      })
    } else {
      res.send({message: 'You are not authorized'})
    }
  })
}

methods.delete = (req, res) => {
  Article.findById(req.params.id)
  .populate('author')
  .exec((err, data) => {
    if (err) res.send(err)
    console.log(req.decoded._id, data.author);
    if (req.decoded._id == data.author._id) {
      data.remove(err2 => {
        if (err2) res.send(err2)
        res.send(data)
      })
    } else {
      res.send({message: 'You are not authorized'})
    }

  })
}

module.exports = methods
