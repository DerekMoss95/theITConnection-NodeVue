<template>
  <v-app id="app" dark>

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="Home">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/" @click="setLayout('home')">Dashboard</router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="Profile">
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/profile" @click="setLayout('profile')">Your Profile</router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="NewProject">
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/new_project" @click="setLayout('new_project')">New Project</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>The IT Connection</v-toolbar-title>
      <v-layout justify-end>
        <v-list-tile @click="Login">
          <v-list-tile-content>
            <router-link to="/login" @click="setLayout('login')"><v-list-tile-title>Login</v-list-tile-title></router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="Logout">
          <v-list-tile-content>
            <router-link to="/logout" @click="setLayout('logout')"><v-list-tile-title>Logout</v-list-tile-title></router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-layout>
    </v-toolbar>

    <component v-bind:is="layout"></component>

    <v-footer app fixed>
      <span></span>
    </v-footer>

  </v-app>
</template>

<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>

<script>
import Home from './views/Home'
import Profile from './views/Profile'
import NewProject from './views/NewProject'
import Login from './views/Login'
import Logout from './views/Logout'

export default {
  name: 'App',
  computed: {
    layout () {
      return this.$store.getters.layout
    }
  },
  components: {
    'home': Home,
    'profile': Profile,
    'new_project': NewProject,
    'login': Login,
    'logout': Logout
  }
}
</script>
