const cookieParser      = require('cookie-parser')
const express           = require('express')
const LocalStrategy     = require('passport-local').Strategy
const passport          = require('passport')
const session           = require('express-session')

module.exports = function () {
  const app = express()
  let visits = {}


// 1. If the request is a GET to / then return 'This is the home page' with a 200 status code

app.get('/', function (req, res) {
  res.send('This is the home page')
})



// 2. If the request is a GET to /greet then return 'Hello, stranger!' with a 200 status code

app.get('/greet', function (req, res) {
  res.send('Hello, stranger!')
})

// 3. If the request is a GET with to /greet/<name> where <name> is a path parameter then
// return 'Hello, <name>!' with the passed in name in the response body. Should return a 200 status code

app.get('/greet/:name', function (req, res) {
  res.send('Hello, ' + req.params.name + '!')
})

// 4. If the request is a GET to /secret/path then return 'Not authorized` with a status code of 401

app.get('/secret/path', function (req, res) {
  res.status(401).send('Not authorized')
})


// 5. If the request is a PUT to /add-numbers then read the body. It will be a JSON array of numbers that
// need to be parsed and then added together. The result of adding those numbers together should be returned
// as the response body with a 200 status code.
// I recommend using the express.json() middleware for parsing the body.
app.use(express.json())

app.put('/add-numbers', function (req, res) {
  console.log(req.body)
  let sum = req.body[0] + req.body[1] + req.body[2] + req.body[3]
  sum = sum.toString()
  res.send(sum)
})

// 6. If the request did not hit any path return 'Path not found' with a 404 status code

app.get('/*', function(req, res) {
  res.status(404).send('Path not found')
});


  // 1. configure passport to use the local authentication strategy

passport.use(new LocalStrategy(function(username, password, done) {
  if (username && password) {
    return done(null, { username: username, visits: new Array() });
  }
    return done(null, false);
}));

  // 2. configure session serialization
  passport.serializeUser(function(user, done) {
  done(null, user.username);
});

  // 3. configure session deserialization
  passport.deserializeUser(function(id, done) {
  done(null, { username: id });
});

  // tell the express app what middleware to use
  app.use(express.urlencoded({extended: true}))
  app.use(cookieParser())
  app.use(session({secret: 'secret key', resave: false, saveUninitialized: true}))
  app.use(passport.initialize())
  app.use(passport.session())

  app.get('/home', function (req, res) {
    if (req.user) {
      visits[req.user.username].push('/home')
      return res.send('Hello, ' + req.user.username);
    } 
    // 4. if the user is logged in then store that they have visited this path
    res.send('1')
  })

  app.get('/profile', function (req, res) {
    if (req.user) {
      visits[req.user.username].push('/profile')
      return res.send('Hello, ' + req.user.username);
    } 
    // 5. if the user is logged in then store that they have visited this path
    res.send('2')
  })

  app.get('/new_project', function (req, res) {
    if (req.user) {
      visits[req.user.username].push('/new_project')
      return res.send('Hello, ' + req.user.username);
    } 
    // 6. if the user is logged in then store that they have visited this path
    res.send('3')
  })

  app.get('/visits', function (req, res) {
    if (req.user) {
      return res.send(visits[req.user.username]);
    } else {
      let emptyVisits = new Array();
      return res.send(emptyVisits);
    }
    // 7. Send back the array of visited routes
  })

  // specify the login url
  app.put('/auth/login',
    passport.authenticate('local'),
    function (req, res) {
      visits[req.user.username] = new Array();
      res.send('You are authenticated, ' + req.user.username)
    })

  // log the user out
  app.put('/auth/logout', function (req, res) {
    req.logout()
    arr = []
    res.send('You have logged out.')
  })

  // catch any errors
  app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Internal server error')
  })

  // start the server listening
  return new Promise((resolve, reject) => {
    const listener = app.listen(3000, function (err) {
      if (err) return reject(err)
      resolve(listener)
    })
  })
}

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

