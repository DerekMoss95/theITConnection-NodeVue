const usersController = require('./controllers/users')
const api = require('./api')
const cookieParser = require('cookie-parser')
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const path = require('path')
const session = require('express-session')

module.exports = function () {
  const app = express()

  app.get('/', function (req, res) {
    res.send('This is the home page')
  })

  app.get('/greet', function (req, res) {
    res.send('Hello, stranger!')
  })

  app.get('/greet/:name', function (req, res) {
    res.send('Hello, ' + req.params.name + '!')
  })

  app.get('/secret/path', function (req, res) {
    res.status(401).send('Not authorized')
  })

  app.use(express.json())

  app.put('/add-numbers', function (req, res) {
    console.log(req.body)
    let sum = req.body[0] + req.body[1] + req.body[2] + req.body[3]
    sum = sum.toString()
    res.send(sum)
  })

  app.get('/*', function (req, res) {
    res.status(404).send('Path not found')
  })

  const listener = app.listen(3000, err => {
    if (err) {
      console.error(err.stack)
    } else {
      console.log('Server listening on port ' + listener.address().port)
    }
  })

  module.exports = {
    app,
    listener
  }
}
