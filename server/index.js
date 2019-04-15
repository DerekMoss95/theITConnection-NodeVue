const { Pool } = require('pg')
const server = require('./server')

const dbClient = new Pool({
  user: 'sysadmin',
  password: 'theitconnection',
  host: '127.0.0.1',
  database: 'theitconnection',
  port: '5432'
})

dbClient.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err.stack)
  } else {
    console.log('Connected to database')
  }
})

server(dbClient, 3000)
  .then(data => {
    console.log('The server is listening on port: ' + data.port)
  })
  .catch(err => {
    console.error(err.stack)
})