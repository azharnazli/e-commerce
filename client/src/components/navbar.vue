<template>
  <v-toolbar color="eaeaea" fixed >

    <v-toolbar-title> <v-btn to="/" color="#621e81" class="white--text"><span style="color: #257aa6;">Switc</span><span
        style="color: #00bdaa;">Hip</span></v-btn></v-toolbar-title>

    <v-spacer></v-spacer>

      <input type="text" name="" id="" placeholder="_______________" style="width: 100px; padding: 5px;">
    <v-btn icon>
      <v-icon>search</v-icon>
    </v-btn>

    <v-btn 
    v-if="isLogin"
    v-on:click="logoutUser"
    class="white--text" color="#00bdaa">
    logout
    </v-btn>
    <router-link v-if="!isLogin" style="text-decoration: none;" to="/login">
      <v-btn class="white--text" color="#00bdaa">
        login
      </v-btn>
    </router-link>
    <router-link v-if="!isLogin" style="text-decoration: none;" to="/register">
      <v-btn class="white--text" color="#00bdaa">
        register
      </v-btn>
    </router-link>
  </v-toolbar>
</template>
<script>
  export default {
    props: ['isLogin'],
    methods : {
      logoutUser() {
        localStorage.clear()
        this.$emit('removeUser')
      }
    }
  }

</script>
<style scoped>

</style>

