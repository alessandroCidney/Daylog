<template>
  <v-app>
    <AppBar />

    <v-main class="defaultContainer">
      <Nuxt />
    </v-main>

    <AppMessage />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppBar from '@/components/layouts/default/AppBar/index.vue';
import AppMessage from '@/components/layouts/AppMessage.vue';

interface Data {};
interface Methods {};
interface Computed {};
interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'default',
  
  middleware: ['authentication', 'theme'],

  components: {
    AppBar,
    AppMessage
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

.defaultContainer {
  background-color: var(--v-cloud-base) !important;
}
</style>
