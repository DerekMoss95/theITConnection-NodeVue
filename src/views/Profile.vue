<template>
  <v-app id="app">
    <v-content>
      <v-container>
        <router-view></router-view>
              <h1 class="white--text"> Projects you are interested in</h1>
              <span v-if="info[0]">
                <tbody style="border: 1px solid #1C6EA4; background-color: #0000; width: 100%; text-align: left; border-collapse: collapse;">
                <tr style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Id  </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Owner </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Name </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Type </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Skills Recommended </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Languages To Be Used </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Project Hardware Needed </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  Needs Contributions? </td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">  <u> Current Project Members </u> </td>
                </tr>
                <tr v-for="project in info">
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.id }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projectowner }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projectname }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projecttype }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projectskills }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projectlanguages }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projecthardware }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projectcontributions }}</td>
                <td style="font-size: 15px; font-weight: bold; border-left: 2px solid #D0E4F5;  border: 1px solid #AAAAAA; padding: 3px 2px;">{{ project.projectmembers }}</td>
                </tr>
                </tbody>
              </span>
              <span v-else>Wow, such empty</span>  
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
name: 'profile',
data () {
    return {
      info: null
    }
  },
  mounted () {
      axios({
        method: 'post',
        data: {
          email: this.$store.state.name
        },
        url: 'http://localhost:3000/api/projects/userProjects'
      })
      .then(response => (this.info = response.data))}
  }
</script>