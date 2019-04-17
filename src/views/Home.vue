<template>
  <v-app id="app">
    <router-view></router-view>
    <v-content>
      <v-container>
        <h1 class="white--text">Welcome to the IT Connection! </h1>
        <div class="white--text">Here are some projects you might be interested in </div>
        <span v-on:onload="projects();">{{ message }}</span>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  data: () => {
    return {
        email: '',
        password: '',
        errorMessage: '',
        message: '',
        results: []
    }
  },
  created: () => {
    let resp = axios({
        method: 'get',
        url: 'http://localhost:3000/api/projects/all'
      })
      let message = 'hey'
      return message
  },
  methods: {
    error (error) {
      this.errorMessage = error;
      },
    projects () {
      let resp = axios({
        method: 'get',
        url: 'http://localhost:3000/api/projects/all'
      })
      data.message = 'hey'
      return data.message
    }
  }
}
</script>

<style>
#nav a {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #999;
  margin: 10px;
}
</style>