const dbUsers = require('../database/users')
const crypto = require('crypto')

const secret = process.env.secret || 'this is a terrible secret'

module.exports = function (dbClient) {
  const users = {}
  const db = dbUsers(dbClient)

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

  users.checkLogin = async function (isLoggedIn, email, password) {
    const loginOk = await db.checkLogin(isLoggedIn, email, password)
    console.log("loginOk: " + loginOk)
    try {
      if (loginOk === 'true') {
        let statusCode = 200
        console.log(statusCode)
        return statusCode
      }
      else {
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }
    }
    catch {
      if (!loginOk) {
        const err = Error('incorrect email or password')
        err.statusCode = 400
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }    
    }
  }

  users.logout = async function (isLoggedIn, email) {
    const logoutOk = await db.logout(isLoggedIn, email)
    console.log("logoutOk: " + logoutOk)
    try {
      if (logoutOk === 'true') {
         let statusCode = 200
         console.log(statusCode)
         return statusCode
      }
      else {
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }
    }
    catch {
      if (!logoutOk) {
        const err = Error('failed to log out')
        err.statusCode = 400
         let statusCode = 400
         console.log(statusCode)
         return statusCode
      }    
    }
  }

  users.register = async function (email, password, firstName, lastName, phone, isLoggedIn) {
    const registerOk = await db.createAccount(email, password, firstName, lastName, phone, isLoggedIn)
    console.log("registerOk: " + registerOk)
    try {
      if (registerOk === true) {
        let statusCode = 200
        console.log(statusCode)
        return statusCode
      }
      else {
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }
    }
    catch {
      if (!registerOk) {
        const err = Error('couldnt register')
        err.statusCode = 400
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }    
    }
  }

  users.getUser = async function (email) {
    const user = await db.getUser(email)
    console.log(user)
    return user
  }



  users.getUserEmail = async function (email) {
    const user = await db.getUserEmail(email)
    console.log(user)
    return user
  }

  users.projects = async function () {
    const projectsOk = await db.projects()
    console.log("projectsOk: " + projectsOk)
    try {
      return projectsOk
      // if (projectsOK === true) {
      //   let statusCode = 200
      //   console.log(statusCode)
      //   return statusCode
      // }
      // else {
      //   let statusCode = 400
      //   console.log(statusCode)
      //   return statusCode
      // }
    }
    catch {
      // if (!projectsOK) {
      //   const err = Error('couldnt register')
      //   err.statusCode = 400
      //   let statusCode = 400
      //   console.log(statusCode)
      //   return statusCode
      // }    
    }
  }

  users.createProject = async function (email, projectName, projectType, projectSkills, projectLanguages, projectHardware, projectContributions, projectMembers) {
    const createProjectOk = await db.createProject(email, projectName, projectType, projectSkills, projectLanguages, projectHardware, projectContributions, projectMembers)
    console.log("projects creation Ok: " + createProjectOk)
    try {
      if (createProjectOk === true) {
        let statusCode = 200
        console.log(statusCode)
        return statusCode
      }
      else {
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }
    }
    catch {
      if (!createProjectOk) {
        const err = Error('couldnt register')
        err.statusCode = 400
        let statusCode = 400
        console.log(statusCode)
        return statusCode
      }    
    }
  }


  users.userProjects = async function (email) {
    const userProjectsOk = await db.userProjects(email)
    console.log("userProjects: " + userProjectsOk)
    try {
      return userProjectsOk
      // if (projectsOK === true) {
      //   let statusCode = 200
      //   console.log(statusCode)
      //   return statusCode
      // }
      // else {
      //   let statusCode = 400
      //   console.log(statusCode)
      //   return statusCode
      // }
    }
    catch {
      // if (!projectsOK) {
      //   const err = Error('couldnt register')
      //   err.statusCode = 400
      //   let statusCode = 400
      //   console.log(statusCode)
      //   return statusCode
      // }    
    }
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