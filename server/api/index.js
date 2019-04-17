const users = require('./users')
const bodyParser = require('express').json
const Router = require('express').Router

// this is the top level API router that includes other API routers
const router = new Router()
module.exports = router

// use the json body parser on all routes
router.use(bodyParser())

// add nested routes
router.use('/users', users)
