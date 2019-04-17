import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    layout: 'default',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    isLoggedIn: !!localStorage.getItem('token'),
    pending: ''
  },

  mutations: {
    SET_LAYOUT (state, payload) {
      state.layout = payload
    },
    UPDATE_USER (state, payload) {
      state.firstName = payload
    },
    [LOGIN] (state) {
      state.pending = true;
    },
    [LOGIN_SUCCESS] (state, payload) {
      state.isLoggedIn = true;
      state.firstName = payload
      state.pending = false;
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false;
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  getters: {
    layout (state) {
      return state.layout
    },
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    getUser: state => {
      return state.firstName
    }
  },
  actions: {
    async login ({
      commit,
      dispatch,
      getters,
      state
    }, {
      email,
      password
    }) {
      commit(LOGIN); // show spinner
      const res = await axios({
        method: 'post',
        data: {
          isLoggedIn: true,
          email: email,
          password: password
        },
        url: 'http://localhost:3000/api/users/login'
      })
      console.log("response: " + res)
      localStorage.setItem("token", "JWT");
      commit(LOGIN_SUCCESS , email );
    },
    async register ({
      commit,
      dispatch,
      getters,
      state
    }, {
      email,
      password,
      firstName,
      lastName,
      phone
    }) {
      commit(LOGIN); // show spinner
      const res = await axios({
        method: 'post',
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          password: password,
          isLoggedIn: true
        },
        url: 'http://localhost:3000/api/users/register'
      })
      console.log("response: " + res)
      localStorage.setItem("token", "JWT");
      commit(LOGIN_SUCCESS , email );
    },
    // async getUser ({
    //   commit,
    //   dispatch,
    //   getters,
    //   state
    // }, {
    //   email
    // }) {
    //   const userRes = await axios({
    //     method: 'post',
    //     data: {
    //       email: email,
    //     },
    //     url: 'http://localhost:3000/api/users/getUser'
    //   })
    //   console.log("response: " + res)
    //   commit(UPDATE_USER, email);
    // },
    async logout ({
      commit,
      dispatch,
      getters,
      state
      }) {
      const res = await axios({
        method: 'post',
        data: {
          isLoggedIn: false,
          email: 'new',
        },
        url: 'http://localhost:3000/api/users/logout'
      })
      console.log("response: " + res)
      localStorage.removeItem("token");
      commit(LOGOUT);
    },
    // async userLogout ({
    //   commit
    // }, {
    //   email
    // }) {
    //   await axios({
    //     method: 'put',
    //     url: '/api/users/logout',
    //     data: {
    //       email
    //     },
    //     body: {
    //       email: email
    //     }
    //   })
    //   commit('user-logout', {
    //     email
    //   })
    //   localStorage.removeItem("token");
    //   commit(LOGOUT);
    // },
    async projectCreate ({
      commit
    }, {
      email,
      projectName,
      projectType,
      projectSkills,
      projectLanguages,
      projectHardware,
      projectContributions,
      projectMembers
    }) {
      await axios({
        method: 'post',
        url: '/api/projects/projectCreate',
        data: {
          email,
          projectName,
          projectType,
          projectSkills,
          projectLanguages,
          projectHardware,
          projectContributions,
          projectMembers
        },
        body: {
          email: email,
          projectName: projectName,
          projectType: projectType,
          projectSkills: projectSkills,
          projectLanguages: projectLanguages,
          projectHardware: projectHardware,
          projectContributions: projectContributions,
          projectMembers: projectMembers
        }
      })
      commit('create-project', {
        email,
        projectName,
        projectType,
        projectSkills,
        projectLanguages,
        projectHardware,
        projectContributions,
        projectMembers
      })
    },
    async projectJoin ({
      commit
    }, {
      email,
      projectID
    }) {
      await axios({
        method: 'post',
        url: '/api/users/projectJoin',
        data: {
          email,
          projectID
        },
        body: {
          email: email,
          projectID: projectID
        }
      })
      commit('join-project', {
        email,
        projectID
      })
    }
  }
})
