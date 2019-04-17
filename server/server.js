const usersController = require('./controllers/users')
const api = require('./api')
const cookieParser = require('cookie-parser')
const express = require('express')
const LocalStrategy = require('passport-local').Strategy
const passport = require('passport')
const path = require('path')
const session = require('express-session')

module.exports = async function (dbClient, port = 0) {

  const users = usersController(dbClient)
  const app = express()

  // create login strategy
  const localStrategy = new LocalStrategy(
    { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
    async function (req, e, p, done) {
      try {
        const { email, password } = req.body
        const user = await users.login(email, password)
        done(null, user || false)
      } catch (err) {
        done(err)
      }
    }
  )

  // tell passport to use a local strategy and tell it how to validate a username and password
  passport.use('local-login', localStrategy)

  // tell passport how to turn a user into serialized data that will be stored with the session
  passport.serializeUser(function (user, done) {
    done(null, user.email)
  })

  // tell passport how to go from the serialized data back to the user
  passport.deserializeUser(function (email, done) {
    const user = users.getUser(email)
    done(null, user || false)
  })

  app.use(express.urlencoded({ extended: true }))
  app.use(cookieParser())
  app.use(session({ secret: 'secret key', resave: false, saveUninitialized: true }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(express.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
    res.sendStatus(200);
    } else {
    next();
    }
  })


  app.post('/api/users/login', async (req, res) => {
      console.log(req.body.isLoggedIn + req.body.email + req.body.password)
      const response = await users.checkLogin(req.body.isLoggedIn, req.body.email, req.body.password)
      console.log("response: " + response)
      if (response === 200){
        res.sendStatus(200)
      }
      else {
        res.sendStatus(400)
      }
  })

  app.post('/api/users/logout', async (req, res) => {
    console.log(req.body.isLoggedIn + req.body.email)
    const response = await users.logout(req.body.isLoggedIn, req.body.email)
    console.log("response: " + response)
    if (response === 200){
      res.sendStatus(200)
    }
    else {
      res.sendStatus(400)
    }
})

app.post('/api/users/register', async (req, res) => {
  console.log(req.body.email + req.body.password + req.body.firstName + req.body.lastName + req.body.phone + req.body.isLoggedIn)
  const response = await users.register(req.body.email, req.body.password, req.body.firstName, req.body.lastName, req.body.phone, req.body.isLoggedIn)
  console.log("response: " + response)
  if (response === 200){
    res.sendStatus(200)
  }
  else {
    res.sendStatus(400)
  }
})

app.get('/api/projects/all', async (req, res) => {
  const response = await users.projects()
  console.log("response: " + response)
     //res.sendStatus(200)
     res.send(response)
  // if (response === 200){
  //   res.sendStatus(200)
  //   return response
  // }
  // else {
  //   res.sendStatus(400)
  // }
})

app.post('/api/projects/createProject', async (req, res) => {
  console.log(req.body.email + req.body.projectName + req.body.projectType + req.body.projectSkills + req.body.projectLanguages + req.body.projectHardware + req.body.projectContributions + req.body.projectMembers)
  const response = await users.createProject(req.body.email, req.body.projectName, req.body.projectType, req.body.projectSkills, req.body.projectLanguages, req.body.projectHardware, req.body.projectContributions, req.body.projectMembers)
  console.log("response: " + response)
  if (response === 200){
    res.sendStatus(200)
  }
  else {
    res.sendStatus(400)
  }
})


app.post('/api/projects/userProjects', async (req, res) => {
  const response = await users.userProjects(req.body.email)
  console.log("response: " + response)
     //res.sendStatus(200)
     res.send(response)
  // if (response === 200){
  //   res.sendStatus(200)
  //   return response
  // }
  // else {
  //   res.sendStatus(400)
  // }
})

  app.post('/api/users/getUser', async (req, res) => {
    console.log(req.body.email)
    const response = await users.getUser(req.body.email)
    console.log("response: " + response)
    if (response === 200){
      res.sendStatus(200)
      res.send(getUser(req.body.email))
      // return user
    }
    else {
      res.sendStatus(400)
    }
})



  const buildPath = path.resolve(__dirname, '../dist')
  app.use(express.static(buildPath))

  // HTML5 History Mode routing
  const indexPath = path.resolve(buildPath, 'index.html')


  return new Promise(function (resolve, reject) {
    const listener = app.listen(port, function (err) {
      if (err) {
        reject(err + "listener error")
      } else {
        resolve({
          port: listener.address().port,
          stop: () => {
            listener.close()
            console.log('Server stopped')
          }
        })
      }
    })
  })
}