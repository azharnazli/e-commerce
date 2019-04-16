<template>
  <v-app>
    <navbar
    v-bind:is-login="isLogin"
    v-on:removeUser="isLogin = false"
    ></navbar>

    <v-content>
      <router-view 
      v-on:successLogin="isLogin = true"
      ></router-view>
      <div @:errorMsg = "errorMessage" ></div>
    </v-content>
    <footers></footers>
  </v-app>
</template>

<script>
import navbar  from './components/navbar'
import footers  from './components/footers'


export default {
  name: 'App',
  components : {
    navbar,
    footers
  },
  data () {
    return {
      isLogin : false,
      errorMessage : ''

    }
  },
  created() {
    this.checkLocalStorage()
  },
   methods : {
    checkLocalStorage() {
      if(localStorage.getItem('token')) this.isLogin = true
    },
    showError(msg) {
      console.log(msg)
    }
   }
}

</script>
