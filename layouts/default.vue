<template>
  <v-app>
    <v-app-bar app elevation="1" color="#FFF" max-height="72px" class="pr-5">
      <nuxt-link to="home">
        <v-img
          max-width="147px"
          :src="require('@/assets/svg/logo_dark.svg')"
        />
      </nuxt-link>

      <v-spacer />

      <v-text-field
        class="app-bar-search"
        outlined
        dense
        color="#000"
        placeholder="Search"
        hide-details
      >
        <template slot="prepend-inner">
          <v-btn
            icon
            small
          >
            <v-icon>
              mdi-magnify
            </v-icon>
          </v-btn>
        </template>
      </v-text-field>

      <v-spacer />

      <PopoverMenu />
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
</style>
