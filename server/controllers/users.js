const pg_db = require('../database/postgres_db')
const crypto = require('crypto')

//const secret = process.env.secret || 'this is a terrible secret'

module.exports = function (client) {
  const users = {}
  const db = pg_db(client)

  users.changePassword = async function (email, oldPassword, newPassword) {
    const passed = await users.checkLogin(email, oldPassword)
    if (!passed) {
      const err = Error('Incorrect email or password')
      err.statusCode = 400
      throw err
    }
    const password = await encrypt(newPassword)
    return db.updatePassword(email, password)
  }

  users.checkLogin = async function (email, password) {
    const pass = await encrypt(password)
    return db.checkLogin(email, pass)
  }

  users.userRegister = async function (email, password) {
    const user = await users.getUser(email)
    if (user) {
      const err = Error('Account already exists')
      err.statusCode = 400
      throw err
    }
    const encryptedPass = await encrypt(password)
    return db.addUser(email, encryptedPass)
  }

  users.getUser = async function (email) {
    return db.getUser(email)
  }

  users.login = async function (email, password) {
    const loginOk = await users.checkLogin(email, password)
    if (!loginOk) return null
    await db.login(email)
    return db.getUser(email)
  }

  users.logout = async function (email) {
    return db.logout(email)
  }

  users.update = async function (email, name, phone) {
    return db.updateUser(email, name, phone)
  }

  return users
}

function encrypt (password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, secret, 100000, 64, 'sha512', (err, derivedKey) => {
      if (err) return reject(err)
      resolve(derivedKey.toString('hex'))
    })
  })
}