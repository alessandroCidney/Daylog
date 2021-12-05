<template>
  <v-app>
    <v-app-bar
      app
      elevation="1"
      color="#FFF"
      max-height="72px"
      class="pr-5 main-app-bar"
      clipped-left
    >
      <v-row>
        
      <v-col cols="4" class=" d-none d-md-flex align-center justify-start">
        <nuxt-link to="/home">
          <v-img
            max-width="147px"
            :src="require('@/assets/svg/logo_dark.svg')"
          />
        </nuxt-link>
      </v-col>

      <v-col md="4" sm="6" class="d-flex align-center justify-center">
        <v-autocomplete
          class="app-bar-search"
          solo
          dense
          color="space"
          placeholder="Search"
          hide-details
        >
          <template slot="prepend-inner">
            <v-btn
              icon
              small
              color="space"
            >
              <v-icon>
                mdi-magnify
              </v-icon>
            </v-btn>
          </template>
        </v-autocomplete>
      </v-col>

      <v-col md="4" sm="6" class="d-flex align-center justify-end">
        <v-spacer />
        
        <v-btn to="/home" icon color="space" depressed plain>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn class="mr-2" icon color="space" depressed plain>
          <v-icon>mdi-bell</v-icon>
        </v-btn>
        
        <PopoverMenu />

      </v-col>

      </v-row>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
    
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import PopoverMenu from '@/components/layouts/PopoverMenu.vue';

export default Vue.extend({
  middleware: 'authentication',

  components: {
    PopoverMenu
  },
});
</script>

<style lang="scss">
.app-bar-search {
  max-width: 417px;

  .v-input__prepend-inner {
    margin-top: 0 !important;

    height: 40px !important;

    align-items: center !important;
  }
}

.main-app-bar {
  z-index: 10;
}
</style>
