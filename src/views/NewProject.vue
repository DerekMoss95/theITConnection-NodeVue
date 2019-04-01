<template>
    <v-app id="app">
        <v-content>
            <v-container>
                <router-view></router-view>
                    <div class="new_project">
                        <h1>Please tell us more about the project you want help with</h1>
                        <form @submit.prevent="new_project">
                            Name of Project: <input type ="text" border-style="solid" border-size="1px" v-model="project_name"><br>
                            Type of Project: <input type ="text" v-model="project_type"><br>
                            Skills Recommended: <input type ="text" v-model="project_rec"><br>
                            Languages being used: <input type ="text" v-model="project_languages"><br>
                            What equipment does it require? <input type ="text" v-model="project_equipment"><br>
                            Need Contributions? <input type ="text" v-model="project_contrib"><br>
                            <input type="submit" value="Submit">
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
      project_name: "",
      project_type: "",
      project_rec: "",
      project_languages: "",
      project_equipment: "",
      project_contrib: ""
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


<!--<template>
  <div>
      <profile> {{NewProject}} </profile>
  </div>
</template>

<script>
import router from '../router'
export default {
    name: 'new_project',
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