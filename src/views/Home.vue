<template>
  <v-app id="app">
    <router-view></router-view>
    <v-content>
      <v-container>
        <h1 class="white--text">Welcome to the IT Connection!</h1>
        <div class="white--text">Here are some projects you might be interested in</div>
        <div id="app">
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
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
name: 'home',
data () {
    return {
      info: null
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/api/projects/all')
      .then(response => (this.info = response.data))
  }
 }
</script>

<style>
#nav a {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #999;
  margin: 10px;
}
</style>