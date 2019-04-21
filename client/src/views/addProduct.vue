<template>
  <v-form style="margin-top: 200px" ref="form" lazy-validation>
    <v-container style="width: 920px;border: 1px solid grey;height: 410px;">
      <v-text-field v-model="product.name" label="name" required></v-text-field>

      <v-text-field v-model="product.description" label="description" required></v-text-field>
      <!-- <v-text-field> -->
      <div>
        <label for=""></label>
        <v-text-field v-model="product.stock" type="number" label="stock" class="inputPrice" required></v-text-field>
        <v-text-field v-model="product.price" type="number" label="price" class="inputPrice" required></v-text-field>
        <v-spacer></v-spacer>
        <input style="display: block; margin-bottom: 30px;" type="file" @change="addImage" label="image"
          class="inputPrice" required />
        <v-btn style="display:inline" bottom class="right" color="success"
        @click="$router.push('/admin')">
          Back
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn @click="newProduct" style="display:inline" bottom class="left" color="warning">
          Add Product
        </v-btn>
      </div>
    </v-container>
  </v-form>
</template>
<script>
  import swal from 'sweetalert';
  export default {
    props: ['getProduct'],
    data() {
      return {
        id: this.$route.params.productId,
        product: {
          name: '',
          stock: '',
          image: null,
          description: '',
          price: ''
        }
      }
    },
    methods: {
      addImage(event) {
        this.product.image = event.target.files[0]
      },
      newProduct() {
        let fd = new FormData()
        fd.append('name', this.product.name)
        fd.append('description', this.product.description)
        fd.append('stock', this.product.stock)
        fd.append('price', this.product.price)
        fd.append('image', this.product.image)
        this.axios({
            method: 'POST',
            url: 'products',
            data: fd,
            headers: {
              token: localStorage.getItem('token')
            }
          })
          .then((data) => {
            this.getProduct()
            this.$router.push('/admin')
          })
          .catch(err => {
            swal({
              title: "error",
              text: "please fill all data",
              icon: "warning",
            });
            console.log(err)
          })
      }
    }
  }

</script>
<style scoped>
  .inputPrice input[type='number'] {
    -moz-appearance: textfield;
  }

  .inputPrice input::-webkit-outer-spin-button,
  .inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

</style>
