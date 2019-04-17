<template>
  <div class="text-xs-center">
    <v-dialog v-model="dialog" width="700">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark v-on="on">
          Show Full Product
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{ names }}
        </v-card-title>
        <v-img :aspect-ratio="16/14" v-bind:src="image">
        </v-img>

        <v-container>
          <h3 style="margin-left:  20px;">Price : $ {{ price }} </h3>
          <h3 style="margin-left:  20px;"> stock: {{ stock }} </h3>
          <p style="margin-left:  20px;"> Description : {{ description }} </p>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn v-on:click="total = 0" color="red" flat left @click="dialog = false">
            cancel
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn 
          v-on:click="addProduct"
          flat fab dark color="indigo">
            <v-icon dark>add</v-icon>
          </v-btn>
          <v-btn 
          v-on:click="subsProduct"
          flat fab dark color="indigo">
            <v-icon dark>remove</v-icon>
          </v-btn>
          <h2 style="margin-right:10px;" >Total: {{ total  }} </h2>
          <v-btn flat color="primary"
          v-on:click="addtoCart" 
          @click="dialog = false"
          >add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    props: ['description', 'names', 'image', 'stock', 'price','cardId'],
    data() {
      return {
        dialog: false,
        total:  0,
        myProduct : {
          productId : '',
          quantity: ''
        }

      }
    },
    methods : {
      addProduct() {
        this.total++
      },
      subsProduct() {
        if(this.total > 0) {
          this.total--
        }
      },
      addtoCart() {
        this.myProduct.productId = this.cardId
        this.myProduct.quantity = this.total
        this.$router.push('/')
        console.log(this.myProduct)
      }
    }
  }

</script>
