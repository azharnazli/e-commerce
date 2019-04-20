<template>
  <v-form style="margin-top: 200px" ref="form" lazy-validation>
    <v-container style="width: 920px;border: 1px solid grey;height: 410px;">
      <v-text-field v-model="product.name" label="name" required></v-text-field>

      <v-text-field v-model="product.description" label="description" required></v-text-field>
      <!-- <v-text-field> -->
      <div>
        <label for=""></label>
      <v-text-field v-model="product.stock" type="number" label="stock" class="inputPrice" required></v-text-field>
      <v-text-field  v-model="product.price" type="number" label="price" class="inputPrice" required></v-text-field>
        <v-spacer></v-spacer>
      <input style="display: block; margin-bottom: 30px;" type="file" @change="editedImage" label="image" class="inputPrice" required />
          <v-btn @click="reset" style="display:inline" bottom class="right" color="success">
            Back
          </v-btn>
          <v-spacer></v-spacer>

          <v-btn @click="editProduct" style="display:inline" bottom class="left" color="warning">
            Edit Product
          </v-btn>
        </div>
    </v-container>
  </v-form>
</template>
<script>
  export default {
    props : ['getProduct'],
    data () {
      return {
        id : this.$route.params.productId,
        product : {},
        image : null,
      }
    },
    methods: {
      editedImage(event) {
        this.image = event.target.files[0]
      },
      editProduct() {
        let fd = new FormData()
        fd.append('name', this.product.name)
        fd.append('description', this.product.description)
        fd.append('stock', this.product.stock)
        fd.append('price', this.product.price)
        fd.append('image', this.image)
        fd.append('file', this.product.image)

        this.axios({
          url : 'products/' + this.$route.params.productId,
          method : 'PUT',
          data : fd,
          headers : {
            token : localStorage.getItem('token'),
            'Content-Type' :  'multipart/form-data'
          }
        })
          .then((data)=> {
            this.getProduct()
            this.$router.push('/admin')
            console.log(data)
          })
          .catch(err => {
            console.log(err)
          })

      },
      reset() {
        this.$refs.form.reset()
        eventBus.$emit('callProduct')
        this.$router.push('/admin')
      }
    },
    created() {
      this.axios({
        url : 'products/' + this.$route.params.productId,
        method : 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.product = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

</script>
<style scoped>
.inputPrice input[type='number'] {
    -moz-appearance:textfield;
}
.inputPrice input::-webkit-outer-spin-button,
.inputPrice input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

</style>

