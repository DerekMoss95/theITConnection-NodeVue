import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import NewProject from './views/NewProject.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
      // meta: {
      //  authenticatedRoute: false
      // navIndex: '1'
      // }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
      // meta: {
      //  authenticatedRoute: true
      // navIndex: '2'
      // }
    },
    {
      path: '/new_project',
      name: 'new_project',
      component: NewProject
      // meta: {
      //  authenticatedRoute: true
      // navIndex: '3'
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
      // meta: {
      //  authenticatedRoute: false
      // navIndex: '4'
      // }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
      // meta: {
      //  authenticatedRoute: true
      // navIndex: '5'
      // }
    },
    {
      path: '*',
      component: Home
    }
  ]
})
