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

  getters: {
    layout (state) {
      return state.layout
    }

    // actions: {
    //   async userRegister ({ commit }, { email, firstName, lastName, password }) {
    //     const res = await axios({
    //       method: 'post',
    //       url: '/api/users/register',
    //       data: { email, firstName, lastName, password },
    //       body: { email: email, firstName: firstName, lastName: lastName, password: password }
    //     })
    //     commit('user-register', { email, firstName, lastName, password })
    //   },
    //   async updateEmail ({ commit }, { email }) {
    //     const res = await axios({
    //       method: 'post',
    //       url: '/api/users/update-email',
    //       data: { email },
    //       body: { email: email }
    //     })
    //     commit('update-email', { email })
    //   },
    //   async userLogin ({ commit }, { email, password }) {
    //     const res = await axios({
    //       method: 'put',
    //       url: '/api/users/login',
    //       data: { email, password },
    //       body: { email: email, password: password }
    //     })
    //     commit('user-login', { email, password })
    //   },
    //   async userLogout ({ commit }, { email }) {
    //     const res = await axios({
    //       method: 'put',
    //       url: '/api/users/logout',
    //       data: { email },
    //       body: { email: email }
    //     })
    //     commit('user-logout', { email })
    //   }
    // }

  }
})
