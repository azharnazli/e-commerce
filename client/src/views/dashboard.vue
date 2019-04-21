<template>
  <div>
    <v-btn to="/admin/addProduct" style="margin-top:70px;">Add new Product</v-btn>
    <v-layout row wrap>
      <v-card style="margin-top: 50px;margin-left:20px;width: 320px;" v-for="product in products"
        v-bind:key="product._id">
        <h2>{{product.name}}</h2>
        <v-img :aspect-ratio="16/20" v-bind:src="product.image">
        </v-img>
        <div>
          <v-btn @click="deleteProduct(`${product._id}`)" class="left" color="red">delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn :to="`/admin/edit/${product._id}`" class="right" color="primary">edit</v-btn>
        </div>
      </v-card>
    </v-layout>
  </div>
</template>
<script>
  import eventBus from '../main.js'
  import swal from 'sweetalert'

  export default {
    props: ['products'],
    methods: {
      deleteProduct(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              this.axios({
                  method: 'delete',
                  url: 'products/' + id,
                  headers: {
                    token: localStorage.getItem('token')
                  }
                })
                .then(() => {
                  eventBus.$emit('fetchProd')

                })
                .catch(err => {
                  console.log(err)
                })
              swal("Poof! Your imaginary file has been deleted!", {
                icon: "success",
              });
            } else {
              swal("Your imaginary file is safe!");
            }
          });
      }
    }
  }

</script>
