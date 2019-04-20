<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="690">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon>shopping_cart</v-icon>
        </v-btn>
      </template>
      <template>
        <v-data-table :headers="headers" :items="myCart" class="elevation-1">
          <template v-slot:items="props">
            <td>{{ props.item.productId.name }}</td>
            <td class="text-xs-right">{{ props.item.quantity }}</td>
            <td class="text-xs-right">${{ props.item.productId.price }}</td>
            <td class="text-xs-right">${{ props.item.productId.price * props.item.quantity  }}</td>
            <td class="text-xs-right">
              <v-btn v-on:click.prevent="addProdcut(props.item.productId._id, 1)" flat fab dark color="indigo">
                <v-icon dark>add</v-icon>
              </v-btn>
              <v-btn 
              v-on:click.prevent="addProdcut(props.item.productId._id, -1)"
              flat fab dark color="indigo">
                <v-icon dark>remove</v-icon>
              </v-btn>
            </td>
          </template>
        </v-data-table>

        <div
        style="background-color: #eaeaea;">
          <v-btn class="right-align" color="primary darken-1" flat @click="dialog = false">Continue Shopping</v-btn>
          <v-btn v-on:click.prevent="checkout()" color="red darken-1" flat @click="dialog = false">
            Checkout</v-btn>
        </div>
      </template>



    </v-dialog>
  </v-layout>
</template>
<script>
import getProduct from '../views/Home';
import eventBus from  '../main.js'
  export default {
    props: ['myCart'],
    data() {
      return {
        dialog: false,
        headers: [{
            text: 'PS4 Game Title',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          {
            text: 'Quantity',
            value: 'quantity'
          },
          {
            text: 'Price',
            value: 'Price'
          },
          {
            text: 'sub Total',
            value: 'sub Total'
          }
        ]
      }
    },
    methods: {
      addProdcut(id, value) {
        this.axios({
            method: 'patch',
            url: '/cart/' + id,
            data: {
              productId: id,
              quantity: value
            },
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then(response => {
            this.$emit('fetchCart')
          })
          .catch(err => {
            console.log(err)
          })

      },
      checkout() {
        this.axios({
          url : 'cart/checkout',  
          method : 'post',
          headers : {
            token : localStorage.getItem('token')
          }
        })
          .then(() => {
            this.$emit('fetchCart')
            eventBus.$emit('callProduct')

          })
          .catch(err => {
            console.log(err.response)
          })
      }
    }
  }

</script>
