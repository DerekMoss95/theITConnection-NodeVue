<template>
  <v-app id="app">
    <v-content>
      <v-container >
        <router-view></router-view>
            <span class="white--text"> Projects you are interested in</span>
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">The IT Connection 2019</span>
    </v-footer>
  </v-app>
</template>

<!--<script>
import router from '../router'
export default {
    name: 'profile',
    props: [''],
    computed: {
        profile() {
            if (this.$route) {
                if ( this.$route.params.id == undefined) {
                    return 'Hello, stranger!'
                }
                return `Hello, ${this.$route.params.id}!`
            } else {
                return 'Hello, stranger!'
            }
        }
    },
    data () {
        return () => {
            id: 'stranger'
        }
    }
}
</script>-->
<script>
  export default {
    data: () => ({
      drawer: null
    }),
    props: {
      source: String
    }
  }
</script>