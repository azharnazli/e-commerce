<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <card style="margin: 10px;" 
      v-for="(product, index) in filteredProduct" 
      v-bind:key="index" v-bind:name="product.name"
      v-bind:description="product.description" 
      v-bind:price="product.price" 
      v-bind:stock="product.stock"
      v-bind:image="product.image"
      v-bind:cardId="product._id">
      </card>
    </v-layout>
  </v-container>
</template>

<script>
  import card from '../components/productCard.vue'

  export default {
    props: ['searchData'],
    components: {
      card
    },
    data() {
      return {
        products: []
      }
    },
    mounted() {
      this.getProduct()

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
    computed: {
      filteredProduct: function () {
        return this.products.filter(product => {
          if (product.name) {
            return product.name.toLowerCase().match(this.searchData.toLowerCase())
          }
        })
      }
    }
  }

</script>
<style scoped>
  .container {
    margin-top: 70px;
  }

</style>
