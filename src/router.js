import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Profile from './views/Profile.vue'
import NewProject from './views/NewProject.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'
import Register from './views/Register.vue'
import MyComponent from './components/MyComponent.vue'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'MyComponent',
    //   component: MyComponent,
    //   meta: {
    //    authenticatedRoute: false,
    //   }
    // },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
       authenticatedRoute: false,
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
       authenticatedRoute: true,
      }
    },
    {
      path: '/new_project',
      name: 'new_project',
      component: NewProject,
      meta: {
       authenticatedRoute: true,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
       authenticatedRoute: false,
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout,
      meta: {
       authenticatedRoute: true,
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '*',
      component: Home
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router
