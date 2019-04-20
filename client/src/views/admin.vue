<template>
  <v-container grid-list-md>
    <router-view
    v-bind:getProduct="getProduct"
    v-bind:products="products">
    </router-view>
  </v-container>
</template>
<script>
    import eventBus from '../main.js' 

  export default {
    data() {
      return {
        products: []
      }
    },
    methods: {
      getProduct() {
        this.axios.get('/products', {
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(({
            data
          }) => {
            this.products = data
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    mounted() {
      this.getProduct()
      eventBus.$on('fetchProd', ()=> {
        this.getProduct()
      })
    }
  }

</script>
