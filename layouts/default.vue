<template>
  <v-app>
    <v-app-bar
      app
      elevation="1"
      :color="headerColor"
      max-height="72px"
      class="pr-5 main-app-bar"
      clipped-left
    >
      <v-row>
        <v-col cols="4" class=" d-none d-md-flex align-center justify-start">
          <nuxt-link to="/home">
            <v-img
              v-if="lightTheme"
              max-width="147px"
              :src="require('@/assets/svg/logo_dark.svg')"
            />

            <v-img
              v-else
              max-width="147px"
              :src="require('@/assets/svg/logo_white.svg')"
            />
          </nuxt-link>
        </v-col>

        <v-col md="4" sm="6" class="d-flex align-center justify-center">
          <SearchBar />
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

    <v-snackbar
      color="space"
      v-model="message"
    >
      Olá! seja bem vindo!

      <template v-slot:action="{ attrs }">
        <v-btn icon right v-bind="attrs" @click="message = false" small>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

import PopoverMenu from '@/components/layouts/PopoverMenu.vue';
import SearchBar from '@/components/layouts/SearchBar.vue';

interface Data {
  message: boolean;
};

interface Methods {};

interface Computed {
  lightTheme: boolean;
  headerColor: string;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'default',
  
  middleware: ['authentication', 'theme'],

  data: () => ({
    message: true
  }),

  components: {
    PopoverMenu,
    SearchBar
  },

  computed: {
    lightTheme () {
      return !this.$vuetify.theme.dark;
    },

    headerColor () {
      if (this.lightTheme) {
        return '#FFF';
      };

      return '#1E1E1E'
    },
  }
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
