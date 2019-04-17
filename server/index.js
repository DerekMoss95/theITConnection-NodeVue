const { Pool, Client } = require('pg')
const server = require('./server')

const client = new Client({
  user: 'sysadmin',
  password: 'theitconnection',
  host: 'localhost',
  database: 'theitconnection',
  port: 5432
})
client.connect()

// client.query('SELECT * FROM "users";', (err, res) => {
//   console.log(err, res)
// })

// client.query('SELECT NOW();', (err, res) => {
//   console.log(err, res)
// })

server(client, 3000)
  .then(data => {
    console.log('The server is listening on port: ' + data.port)
  })
  .catch(err => {
    console.error(err.stack)
})