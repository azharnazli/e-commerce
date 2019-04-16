<template>
  <v-layout>
    <v-container>
      <v-flex xs12 >
        <v-card>
          <v-img class="white--text" height="200px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline">Top 10 Australian beaches</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Stock: 10</span><br>
              <span>Price : $100</span><br>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn flat color="orange">add to cart</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-container>
  </v-layout>
</template>
