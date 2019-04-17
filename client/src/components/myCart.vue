<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>shopping_cart</v-icon>
        </v-btn>
      </template>


      <v-card >
        <v-card-title class="headline">My Shopping  Cart List</v-card-title>
        
        <v-card-text v-for="(cart, index)  in  myCart" v-bind:key="index" >{{ index + 1}}. {{cart.productId.name }} quantity: {{cart.quantity}}</v-card-text>
        <v-card-actions>


          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat @click="dialog = false">Agree</v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
  export default {
    props : ['myCart'],
    data() {
      return {
        dialog: false
      }
    }
  }

</script>
