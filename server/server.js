const cookieParser = require('cookie-parser')
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const session = require('express-session')
const api = require('./api')


module.exports = function () {
  const app = express()
  let visits = {}

  app.post('/login',
    passport.authenticate('local'),
    function (req, res) {
      res.redirect('/new_project' + req.user.username)
    })

  passport.use(new LocalStrategy(function (username, password, done) {
    if (username === 'admin' && password === 'password') {
      return done(null, { username: username, visits: [] })
    }
    return done(null, false)
  }))

  passport.serializeUser(function (user, done) {
    done(null, user.username)
  })

  passport.deserializeUser(function (id, done) {
    done(null, { username: id })
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use('/api', api)

  app.get('/home', function (req, res) {
    if (req.user) {
      visits[req.user.username].push('/home')
      return res.send('Hello, ' + req.user.username)
    }
    res.send('1')
  })

  app.get('/profile', function (req, res) {
    if (req.user) {
      visits[req.user.username].push('/profile')
      return res.send('Hello, ' + req.user.username)
    }
    res.send('2')
  })

  app.get('/new_project', function (req, res) {
    if (req.user) {
      visits[req.user.username].push('/new_project')
      return res.send('Hello, ' + req.user.username)
    }
    res.send('3')
  })

  app.get('/visits', function (req, res) {
    if (req.user) {
      return res.send(visits[req.user.username])
    } else {
      let emptyVisits = new Array()
      return res.send(emptyVisits)
    }
  })

  app.put('/login',
    passport.authenticate('local'),
    function (req, res) {
      visits[req.user.username] = new Array()
      res.send('You are authenticated, ' + req.user.username)
    })

  app.put('/logout', function (req, res) {
    req.logout()
    arr = []
    res.send('You have logged out.')
  })

  app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Internal server error')
  })

  return new Promise((resolve, reject) => {
    const listener = app.listen(3000, function (err) {
      if (err) return reject(err)
      resolve(listener)
    })
  })
}
