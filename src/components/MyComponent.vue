<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-btn color="primary" @click="setLayout('default')">Dashboard</v-btn>
      <v-btn color="primary" @click="setLayout('home')">Dashboard</v-btn>
      <v-btn color="secondary" @click="setLayout('profile')">Your Profile</v-btn>
      <v-btn color="secondary" @click="setLayout('new_project')">New Project</v-btn>
      <v-btn color="secondary" @click="setLayout('login')">Login</v-btn>
      <v-btn color="secondary" @click="setLayout('logout')">Logout</v-btn>
      <v-btn color="secondary" @click="setLayout('register')">Register</v-btn>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  methods: {
    setLayout (layout) {
      this.$store.commit('SET_LAYOUT', layout)
    }
  }
}
</script>
