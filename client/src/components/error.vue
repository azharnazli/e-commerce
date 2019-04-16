<template>
  <v-alert :value="true" color="error">
    {{ msg }}
  </v-alert>
</template>
<script>
  export default {
    props: ['msg']
  }

</script>
