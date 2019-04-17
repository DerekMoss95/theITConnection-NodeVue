<template>
    <v-app id="app">
        <v-content>
            <v-container>
                <router-view></router-view>
                    <div class="logout">
                        <div>Do you want to log out? </div>
                        <form label-width="80px" @submit.prevent="logout()">
                          <v-btn type="primary" value="Submit" color="success">Submit</v-btn>
                        </form>
                    </div>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
export default {
  name: 'logout',
  data: () => {
    return {
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push({name: 'home'}))
        .catch(err => {this.errorMessage = err})
    }
  }
}
</script>
