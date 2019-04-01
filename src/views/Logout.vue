<template>
    <v-app id="app">
        <v-content>
            <v-container>
                <router-view></router-view>
                    <div class="logout">
                        <div>You have successfully logged out</div>
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