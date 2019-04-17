const Users = require('../controllers/users')
const isAuthenticated = require('../middlewares/authenticated')
const passport = require('passport')
const Router = require('express').Router

module.exports = function (dbClient) {
  const users = Users(dbClient)
  const router = new Router()

  router.put('/login', (req, res) => {
    console.log(req)
    console.log(res)
    passport.authenticate('local-login', function(error, user, info) {
      console.log(user)
      if (error) {
        return res.status(500).json(error + "derek's 500 error")
      } else if (!user) {
        return res.status(401).json(info.message + "derek's 401 error")
      } else {
        res.sendStatus(200)
      }
    })(req, res, next)
  })

  router.post('/change-password', isAuthenticated, async (req, res) => {
    const { newPassword, oldPassword } = req.body
    const user = req.user
    const changed = await users.changePassword(user.email, oldPassword, newPassword)
    if (changed) {
      res.sendStatus(200)
    } else {
      res.status(400).send('Incorrect email or password')
    }
  })

  router.post('/register', async (req, res) => {
    const { email, password } = req.body
    const created = await users.create(email, password)
    if (created) {
      res.sendStatus(200)
    } else {
      res.sendStatus(400)
    }
  })

  router.get('/', function (req, res) {
    res.send('Wiki home page');
  })

  return router
}