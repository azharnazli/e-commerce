<template>
  <v-container fluid >
    <v-layout wrap row>
        <card v-for=" (i , index) in 10" v-bind:key="index" ></card>
    </v-layout>

  </v-container>
</template>

<script>
  import card from '../components/productCard.vue'

  export default {
    components: {
      card
    }
  }

</script>
<style scoped>
  .container{
    margin-top: 30px;
  }

</style>

