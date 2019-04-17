<template>
  <v-app id="app">
    <router-view></router-view>
    <v-content>
      <v-container>
  <div class="register">
    <h2>Register</h2>
    <form ref="form" label-width="80px" @submit.prevent="register()">
        Email
        <input v-model="email" style="background-color: white; color: black"/><br><br>
        Password
        <input type="password" v-model="password" style="background-color: white; color: black"/><br><br>
        First Name
        <input v-model="firstName" style="background-color: white; color: black"/><br><br>
        Last Name
        <input v-model="lastName" style="background-color: white; color: black"/><br><br>
        Phone
        <input v-model="phone" style="background-color: white; color: black"/><br><br>

        <v-btn type="primary" value="Submit" color="success">Submit</v-btn><br><br>
    </form>
  </div>
              <p> {{errorMessage}} </p>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'register',
  data: () => {
    return {
        email: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        errorMessage: ''
    }
  },
  methods: {
    error (error) {
      this.errorMessage = error;
      },
    register () {
      let email = this.email 
      let password = this.password
      let firstName = this.firstName
      let lastName = this.lastName
      let phone = this.phone
      this.$store.dispatch('register', { email, password, firstName, lastName, phone })
        .then(() => this.$router.push({name: 'home'}))
        .catch(err => {this.errorMessage = err})
    }
  }
}
</script>
