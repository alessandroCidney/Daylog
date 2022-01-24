<template>
  <v-app-bar
    app
    elevation="1"
    :color="headerColor"
    max-height="72px"
    class="pr-5 main-app-bar"
    clipped-left
  >
    <v-row>
      <v-col cols="4" class=" d-none d-md-flex align-center justify-start pl-10">
        <nuxt-link to="/home">
          <v-img
            v-if="lightTheme"
            width="100px"
            :src="require('@/assets/svg/logo_dark.svg')"
          />

          <v-img
            v-else
            max-width="100px"
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
</template>

<script lang="ts">
import Vue from 'vue';
import PopoverMenu from './components/PopoverMenu.vue';
import SearchBar from './components/SearchBar.vue';

interface Data {};
interface Methods {};

interface Computed {
  lightTheme: boolean;
  headerColor: string;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
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