<template>
    <v-app id="app">
        <v-content>
            <v-container>
                <router-view></router-view>
                    <div class="login">
                        <h1>Please log in to continue</h1>
                        <form @submit.prevent="login">
                            Username: <input type ="text" v-model="username"><br>
                            Password: <input type ="password" v-model="password"><br>
                            <input type ="submit" value="Login">
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
      username: "",
      password: ""
    }
  },
  methods: {
    login() {
      window.user = {
        username: this.username,
        password: this.password
      }
      this.$router.push('home')
    }
  }
}
</script>