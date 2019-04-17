<template>
  <v-app>
    <v-toolbar color="eaeaea" fixed>

      <v-toolbar-title>
        <v-btn to="/" color="#621e81" class="white--text"><span style="color: #257aa6;">Switc</span><span
            style="color: #00bdaa;">Hip</span></v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <input v-model="search" type="text" name="" id="" placeholder="_______________"
        style="width: 100px; padding: 5px;">
      <v-icon>search</v-icon>
      <div v-if="isLogin">
        <cart v-bind:my-cart="cartData" />
      </div>

      <v-btn v-if="isLogin" v-on:click="logoutUser" class="white--text" color="#00bdaa"> logout
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

    <v-content>
      <router-view v-bind:searchData="search" v-on:successLogin="isLogin = true"></router-view>
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
        cartData : []
      }
    },
    created() {
      this.checkLocalStorage()
    },
    methods: {
      checkLocalStorage() {
        if (localStorage.getItem('token')) {
          this.isLogin = true
          this.fetchCart()
        }
      },
      logoutUser() {
        this.isLogin = false
        localStorage.clear()
        this.$router.push('/')
      },
      readRefs() {
        console.log(this.$refs)
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
      }
    }
  }

</script>
