<template>
  <v-app id="app">
    <router-view></router-view>
    <v-content>
      <v-container>
            <h1 class="white--text">Welcome to the IT Connection! </h1>
            <div class="white--text">Here are some projects you might be interested in </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {

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
