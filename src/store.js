import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'home',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: ''
  },

  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    }
    // need updateEmail and addUser etc
  },
//Need an api/projects and an api/users
//Need a database/users and a database/projects

//users:
//register, update email, update password, login, logout,
//get user, get user projects, get user subscribers, get user info

//projects: 
//create project, update project, delete project 
//get project, get project details, get project subscribers, get project creator, get all project, projects by username
  getters: {
    layout (state) {
      return state.layout
    },
    actions: {
      async userRegister ({ commit }, { email, firstName, lastName, password }) {
        const res = await axios({
          method: 'post',
          url: '/api/users/register',
          data: { email, firstName, lastName, password },
          body: { email: email, firstName: firstName, lastName: lastName, password: password }
        })
        commit('user-register', { email, firstName, lastName, password })
      },
      async updateEmail ({ commit }, { email }) {
        const res = await axios({
          method: 'post',
          url: '/api/users/updateEmail',
          data: { email },
          body: { email: email }
        })
        commit('update-email', { email })
      },
      async updatePassword ({ commit }, { email, password }) {
        const res = await axios({
          method: 'post',
          url: '/api/users/updatePassword',
          data: { email, password },
          body: { email: email, password: password }
        })
        commit('update-email', { email, password })
      },
      async userLogin ({ commit }, { email, password }) {
        const res = await axios({
          method: 'put',
          url: '/api/users/login',
          data: { email, password },
          body: { email: email, password: password }
        })
        commit('user-login', { email, password })
      },
      async userLogout ({ commit }, { email }) {
        const res = await axios({
          method: 'put',
          url: '/api/users/logout',
          data: { email },
          body: { email: email }
        })
        commit('user-logout', { email })
      }
    }

  }
})
