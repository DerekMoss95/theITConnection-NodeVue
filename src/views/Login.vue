<!--<template>
    <v-app id="app">
        <v-content>
            <v-container>
                <router-view></router-view>
                    <div class="login">
                        <h1>Please log in to continue</h1>
                      <form action="/login" method="post">
                          <div>
                              <label>Username:</label>
                              <input type="text" name="username"/>
                          </div>
                          <div>
                              <label>Password:</label>
                              <input type="password" name="password"/>
                          </div>
                              <button type="submit" @click="login()" value="Log In"/>
                      </form>
                    </div>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    userLogin () {
      window.user = {
        username: this.username,
        password: this.password
      }
      this.$router.push('home')
    }
  }
}
</script>-->


<template>
  <v-app id="app">
    <router-view></router-view>
    <v-content>
      <v-container>
        <div class="login">
          <h2>Login</h2>
          <form label-width="80px" @submit.prevent="login()">
            Username
            <input v-model="email" style="background-color: white; color: black"> <br>
            Password
            <input
              type="password"
              v-model="password"
              style="background-color: white; color: black"
            >
            <v-btn type="primary" value="Submit" color="success">Submit</v-btn>
            <br>
            <br>
            <p> {{errorMessage}} </p>
          </form>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'login',
  data: () => {
    return {
        email: '',
        password: '',
        errorMessage: ''
    }
  },
  methods: {
    error (error) {
      this.errorMessage = error;
      },
    login () {
      let email = this.email 
      let password = this.password
      this.$store.dispatch('login', { email, password })
        .then(() => this.$router.push({name: 'home'}))
        .catch(err => {this.errorMessage = err})
    }
  }
}
</script>
