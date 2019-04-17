<template>
  <v-app id="app" dark>

    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <p>Hello, {{$store.getters.getUser}} </p> <br>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/" @click="setLayout('home')">Dashboard</router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/profile" @click="setLayout('profile')">Your Profile</router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-action>
            <v-icon>add</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link to="/new_project" @click="setLayout('new_project')">New Project</router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>The IT Connection</v-toolbar-title>
      <v-layout justify-end>
        <v-list-tile >
          <v-list-tile-content>
            <router-link to="/login" @click="setLayout('login')"><v-list-tile-title>Login</v-list-tile-title></router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-content>
            <router-link to="/register" @click="setLayout('register')"><v-list-tile-title>Register</v-list-tile-title></router-link>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile >
          <v-list-tile-content>
            <router-link to="/logout" @click="setLayout('logout')"><v-list-tile-title>Logout</v-list-tile-title></router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-layout>
    </v-toolbar>

    <router-view></router-view>


    <v-footer app fixed>
      <span></span>
    </v-footer>

  </v-app>
</template>

<script>
  export default {
    data: () => ({
      drawer: null,
    }),
    props: {
      source: String
    }
  }
</script>