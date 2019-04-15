const { Pool, Client } = require('pg')
const postgresClient = new Client({
  user: 'admin',
  host: 'postgres://localhost',
  database: 'db',
  password: 'password',
  port: 3211,
})


module.exports = function () {
  postgresClient.connect();
  
  return {
    async addUser (name, password, email) {
      const text = 'INSERT INTO users(name, password, email) VALUES($1, $2, $3) RETURNING *'
      const values = [name, password, email]
      try {
        const res = await postgresClient.query(text, values)
        console.log(res.rows[name])
        return res.rows[0]
      } catch(err) {
        console.log(err.stack)
      }
    },

    async getUserById (id) {
      const text = 'SELECT * from users WHERE id = $1'
      const values = [id]
      try {
        const res = await postgresClient.query(text, values)
        console.log(res.rows)
        return res.rows[0]
      } catch(err) {
        console.log(err.stack)
      }
    },

    async listUsers () {
      const text = 'SELECT * from users'
      try {
        const res = await postgresClient.query(text)
        console.log(res.rows)
        return res.rows
      } catch(err) {
        console.log(err.stack)
      }
    },

    async removeUserById (id) {
      const text = 'DELETE from users WHERE id = $1'
      const values = [id]
      try {
        const res = await postgresClient.query(text, values)
        console.log(res.rows)
        return res.rows[0]
      } catch(err) {
        console.log(err.stack)
      }
    },
  }
  client.end();

}
