<template>
  <v-app>
    <v-toolbar color="eaeaea" fixed>

      <v-toolbar-title >
        <v-btn to="/" color="#621e81" class="white--text"><span style="color: #257aa6;">Switc</span><span
            style="color: #00bdaa;">Hip</span></v-btn>
      </v-toolbar-title>
      <v-btn v-if="roles == 'admin'" to="/admin" color="#621e81" class="white--text">ADMIN</v-btn>

      <v-spacer></v-spacer>

      <input v-model="search" type="text" name="" id="" placeholder="_______________"
        style="width: 100px; padding: 5px;">
      <v-icon>search</v-icon>
      <div v-if="isLogin">
        
        <cart v-if="cartData.length >= 1"
        v-bind:my-cart="cartData"
        v-on:fetchCart="fetchCart"
        />
      </div>

      <v-btn v-if="isLogin" v-on:click="logoutUser" class="white--text" color="#00bdaa"> logout
      </v-btn>

      <router-link 
      v-if="!isLogin"
      style="text-decoration: none;" to="/login">
        <v-btn
        class="white--text" color="#00bdaa">
          login
        </v-btn>
      </router-link>

      <router-link v-if="!isLogin" style="text-decoration: none;" to="/register">
        <v-btn class="white--text" color="#00bdaa">
          register
        </v-btn>

      </router-link>

    </v-toolbar>

    <v-content>
      <router-view 
      v-bind:searchData="search"
      v-on:successLogin="isLogin = true"
      v-on:changeRoles="changeRoles"
      v-on:fetchCart="fetchCart"
      v-bind:isLogin="isLogin"
      >
      </router-view>
    </v-content>

    <footers></footers>

  </v-app>

</template>

<script>
  import footers from './components/footers'
  import cart from './components/myCart.vue'


  export default {
    name: 'App',
    components: {
      footers,
      cart
    },
    data() {
      return {
        isLogin: false,
        errorMessage: '',
        search: '',
        cartData : [],
        clicked : false,
        roles : ''
      }
    },
    created() {
      this.checkLocalStorage()
    },
    methods: {
      checkLocalStorage() {
        if (localStorage.getItem('token')) {
          this.axios({
            method : 'post',
            url : 'users/verify',
            data : {
              token : localStorage.getItem('token')
            }
          })
            .then((verified) => {
              this.isLogin = true
              this.roles = localStorage.getItem('roles')
              this.fetchCart()
            })
            .catch(err => {
              console.log(err)
            })
        }
      },
      logoutUser() {
        this.isLogin = false
        this.roles = ''
        localStorage.clear()
        this.$router.push('/')
      },
      fetchCart() {
      this.axios.get('/cart', {
          headers  : {
            token  : localStorage.getItem('token')
          }
        })
          .then(({data}) => {
            this.cartData = data
          })
          .catch(err => {
            console.log(err)
          })
      },
      changeRoles()  {
          this.roles = localStorage.getItem('roles')
      }
    }
  }

</script>
