<template>
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
                          <div>
                              <input type="submit" value="Log In"/>
                          </div>
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
    login () {
      window.user = {
        username: this.username,
        password: this.password
      }
      this.$router.push('home')
    }
  }
}
</script>
