<template>
  <v-app id="app">
    <router-view></router-view>
      <v-content>
        <v-container>
          <div class="new_project">
            <h1>Submit A Project</h1>
              <form ref="form" label-width="80px" @submit.prevent="projectCreate()">
                Name of Project (Max 20 characters):
                <input v-model="projectName" style="background-color: white; color: black" />
                <br>
                <br>Type of Project (Max 20 characters):
                <input v-model="projectType" style="background-color: white; color: black" />
                <br>
                <br>Skills Recommended (Max 256 characters):
                <input v-model="projectSkills" style="background-color: white; color: black" />
                <br>
                <br>Languages being used (Max 256 characters):
                <input v-model="projectLanguages" style="background-color: white; color: black" />
                <br>
                <br>What equipment does it require? (Max 256 characters)
                <input v-model="projectHardware" style="background-color: white; color: black" />
                <br>
                <br>Need Contributions? (Max 5 characters)
                <input v-model="projectContributions" style="background-color: white; color: black" />
                <br>
                <br>Members? (Max 256 characters)
                <input v-model="projectMembers" style="background-color: white; color: black" />
                <br>
                <br>
                <v-btn type="primary" value="Submit" color="success">Submit</v-btn><br><br>
                <br>
                <br>
                </form>
            </div>
          <p> {{errorMessage}} </p>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import store from '../store'
export default {
  name: "new_project",
  data: () => {
    return {
      projectName: "",
      projectType: "",
      projectSkills: "",
      projectLanguages: "",
      projectHardware: "",
      projectContributions: "",
      projectMembers: "",
      errorMessage: ''
    };
  },
  methods: {
    error (error) {
      this.errorMessage = error;
    },
    projectCreate () {
      let projectName = this.projectName
      let projectType = this.projectType
      let projectSkills = this.projectSkills
      let projectLanguages = this.projectLanguages
      let projectHardware = this.projectHardware
      let projectContributions = this.projectContributions
      let projectMembers = this.projectMembers
      this.$store.dispatch('projectCreate', {projectName, projectType, projectSkills, projectLanguages, projectHardware, projectContributions, projectMembers })
        .then(() => this.$router.push({name: 'home'}))
        .catch(err => {this.errorMessage = err})
      }
    }
}
</script>



