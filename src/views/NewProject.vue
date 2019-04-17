<template>
  <v-app id="app">
    <v-content>
      <v-container>
        <router-view></router-view>
        <div class="new_project">
          <h1>Please tell us more about the project you want help with</h1>
          <form @submit.prevent="new_project">
            Name of Project:
            <input type="text" style="background-color: white; color: black" v-model="project_name">
            <br>
            <br>Type of Project:
            <input type="text" style="background-color: white; color: black" v-model="project_type">
            <br>
            <br>Skills Recommended:
            <input
              type="text"
              style="background-color: white; color: black"
              v-model="project_skills"
            >
            <br>
            <br>Languages being used:
            <input
              type="text"
              style="background-color: white; color: black"
              v-model="project_languages"
            >
            <br>
            <br>What equipment does it require?
            <input
              type="text"
              style="background-color: white; color: black"
              v-model="project_hardware"
            >
            <br>
            <br>Need Contributions?
            <input
              type="text"
              style="background-color: white; color: black"
              v-model="project_contributions"
            >
            <br>
            <br>Members?
            <input
              type="text"
              style="background-color: white; color: black"
              v-model="project_members"
            >
            <br>
            <br>
            <v-btn type="submit" value="Submit" color="success">Submit</v-btn>
            <br>
            <br>
          </form>
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "new_project",
  data: () => {
    return {
      email: "",
      project_name: "",
      project_type: "",
      project_skills: "",
      project_languages: "",
      project_hardware: "",
      project_contributions: "",
      project_members: ""
    };
  },
  methods: {
    projectCreate() {
      window.user = {
        email: this.email,
        project_name: this.project_name,
        project_type: this.project_type,
        project_skills: this.project_skills,
        project_languages: this.project_languages,
        project_hardware: this.project_hardware,
        project_contributions: this.project_contributions,
        project_members: this.project_members
      };
      this.$router.push("home");
    }
  }
};
</script>



