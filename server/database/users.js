module.exports = function (client) {
  const dbUsers = {}

  dbUsers.checkLogin = async function (isLoggedIn, email, password) {
    try {
      const { rowCount } = await client.query({
        text: 'SELECT * FROM users WHERE email = $1 AND password = $2',
        values: [ email, password ]
      })
      const { rows } = await client.query({
        text: 'UPDATE users SET loggedin = $1 WHERE email = $2',
        values: [ isLoggedIn, email ]
      })
      console.log("rowCount" + rowCount)
      console.log("rows: login " + rows)
      if (rowCount > 0) {
        return 'true'
      }
      else {
       return "errrorr checkLogin"
      }
    }
    catch {
      return "ERRRRROOOOORRR"
    }
  }

  dbUsers.logout = async function (isLoggedIn, email) {
    try {
      const { rowCount } = await client.query({
        text: 'SELECT * FROM users WHERE email = $1',
        values: [ email ]
      })
      const { rows } = await client.query({
        text: 'UPDATE users SET loggedin = $1 WHERE email = $2',
        values: [ isLoggedIn, email ]
      })
      console.log("rowCount" + rowCount)
      console.log("rows: logout " + rows)
      if (rowCount > 0) {
        return 'true'
      }
      else {
       return "errrorr logout"
      }
    }
    catch {
      return "ERRRRROOOOORRR"
    }
  }

  dbUsers.createAccount = async function (email, password, firstName, lastName, phone, isLoggedIn) {
    try {
      const { rowCount } = await client.query({
        text: 'INSERT INTO users (email, password, firstname, lastname, phone, isloggedin) VALUES ($1, $2, $3, $4, $5, $6)',
        values: [ email, password, firstName, lastName, phone, isLoggedIn]
      })
      console.log(rowCount)
      if (rowCount > 0) {
        return rowCount > 0
      }
      else {
        return "errrorr createAccount"
      }
    }
    catch {
      return "ERRRRROOOOORRR"
    }
  }

  dbUsers.getUser = async function (email) {
    try {
      const res  = await client.query({
        text: 'SELECT firstname FROM users WHERE email = $1',
        values: [ email ]
      })
      const user = res.rows[0].firstname
      console.log(user)
      return user
      // if (rowCount > 0) {
      //   return rowCount
      // }
      // else {
      //   return "errrorr"
      // }
    }
    catch {
      return "ERRRRROOOOORRR"
    }
  }


  dbUsers.projects = async function () {
    try {
      const res  = await client.query({
        text: 'SELECT * FROM users;',
        values: [ ]
      })
      const user = res.rows[0]
      console.log(user)
      return user
      // if (rowCount > 0) {
      //   return rowCount
      // }
      // else {
      //   return "errrorr"
      // }
    }
    catch {
      return "ERRRRROOOOORRR"
    }
  }

  return dbUsers
}