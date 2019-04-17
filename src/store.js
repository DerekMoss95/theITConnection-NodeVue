import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      getState: (key) => Cookies.getJSON(key),
      setState: (key, state) => Cookies.set(key, state, { expires: 3, secure: true })
    })
  ],
  state: {
    layout: 'default',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    status: '',
    token: localStorage.getItem('token') || '',
    name: localStorage.getItem('name'),
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
      // state.firstName = payload
      // state.email = payload
      state.pending = false;
    },
    [LOGOUT] (state) {
      localStorage.setItem("name", null);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      state.name = null
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
      return state.name
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
      commit(LOGIN);
      const res = await axios({
        method: 'post',
        data: {
          isLoggedIn: true,
          email: email,
          password: password
        },
        url: 'http://localhost:3000/api/users/login'
      })
      console.log("response: " + email)
      localStorage.setItem("token", "JWT");
      localStorage.setItem("name", email);
      state.name = email
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
      commit(LOGIN);
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
      localStorage.setItem("name", email);
      state.name = email
      commit(LOGIN_SUCCESS , email );
    },
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
      commit(LOGOUT);
    },
    async projectCreate ({
      commit,
      dispatch,
      getters,
      state
    }, {
      projectName,
      projectType,
      projectSkills,
      projectLanguages,
      projectHardware,
      projectContributions,
      projectMembers
    }) {
      const res = await axios({
        method: 'post',
        data: {
          email: getters.getUser,
          projectName: projectName,
          projectType: projectType,
          projectSkills: projectSkills,
          projectLanguages: projectLanguages,
          projectHardware: projectHardware,
          projectContributions: projectContributions,
          projectMembers: projectMembers
        },
        url: 'http://localhost:3000/api/projects/createProject',
      })
      console.log("response: " + res)
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
