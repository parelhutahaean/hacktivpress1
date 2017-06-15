var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var article = require('./routes/article')
var user = require('./routes/user')
var mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.PORT);
mongoose.connect('mongodb://localhost/hacktivpress1-parel');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected to hacktivpress1-parel')
});
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000)
app.use('/api', article)
app.use('/', user)

app.listen(app.get('port'), () => {
  console.log('App is listening to port ' + app.get('port'))
})

module.exports = app;
