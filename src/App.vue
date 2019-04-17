<template>
  <v-app>
    <component v-bind:is="layout"></component>
  </v-app>
</template>


<style>
  .input-group__details:after {
    background-color: rgba(255, 255, 255, 0.32) !important;
  }
</style>

<script>
import AppLayout from './layouts/Default'

import Home from './views/Home'
import Profile from './views/Profile'
import NewProject from './views/NewProject'
import Login from './views/Login'
import Logout from './views/Logout'
import Register from './views/Register'

export default {
  computed: {
    layout () {
      return this.$store.getters.layout
    }
  },
  components: {
    'default': AppLayout,
    // define as many layouts you want for the application
  }
}
</script>