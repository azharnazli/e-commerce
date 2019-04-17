<template>
  <v-layout>
    <v-flex xs12 m12>
      <v-hover>
        <v-card slot-scope="{ hover }" class="mx-auto" color="grey lighten-4" max-width="360">
          <v-img :aspect-ratio="16/14"
            v-bind:src="image">
            <v-expand-transition>
              <div v-if="hover"
                class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                style="height: 100%;">
                ${{ price }}
              </div>
            </v-expand-transition>
          </v-img>
          <v-card-text class="pt-4" style="position: relative;">
            <v-btn absolute color="#00bdaa" class="white--text" fab large right top>
              <v-icon>shopping_cart</v-icon>
            </v-btn>
            <h3 class="display-1 font-weight-light teal--text mb-2">{{ name }}</h3>
            <div class="font-weight-light title mb-2">stock : {{ stock }}</div>
            <div class="font-weight-light title mb-2">
              {{ description }}
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>

<style>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }

</style>
<script>
export default {
  props: ['name', 'image', 'price', 'description', 'stock'],
  data(){
    return {
     
    }
  }
}
</script>
