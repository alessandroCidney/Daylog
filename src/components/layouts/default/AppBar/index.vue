<template>
  <v-app-bar
    app
    :class="{
      'pr-5 mainAppBar': true,
      'mainAppBarDark': theme.isDark
    }"
    :elevation="0"
    :color="headerColor"
    clipped-left
  >
    <v-row>
      <v-col cols="4" class=" d-none d-md-flex align-center justify-start pl-10">
        <nuxt-link to="/home">
          <v-img
            v-if="!theme.isDark"
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

      <v-col md="4" sm="6" class="d-flex align-center justify-end" />

      <v-col v-if="!onlyLogo" md="4" sm="6" class="d-flex align-center justify-end">
        <v-spacer />

        <SearchBar />
        
        <v-btn to="/home" icon color="space" class="mr-2" depressed plain>
          <v-icon>mdi-home</v-icon>
        </v-btn>
        
        <PopoverMenu />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts">
import { Vue, Component, Inject, Prop } from 'vue-property-decorator';
import PopoverMenu from './components/PopoverMenu.vue';
import SearchBar from './components/SearchBar.vue';

type TInjectedTheme = {
  isDark: boolean;
};

@Component({
  components: { PopoverMenu, SearchBar }
})
export default class AppBar extends Vue {
  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;

  @Prop(Boolean) onlyLogo!: boolean;

  get headerColor () {
    return this.theme.isDark ? '#1E1E1E' : '#FFF'; 
  };
};
</script>

<style lang="scss">
.mainAppBar {
  z-index: 10;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #dddddd !important;

  &.mainAppBarDark {
    background: rgba(0, 0, 0, 0.9) !important;
    border-bottom: 1px solid rgb(60, 60, 60) !important;
  }
}
</style>
