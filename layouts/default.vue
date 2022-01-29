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
import { Vue, Component } from 'vue-property-decorator';
import AppBar from '@/components/layouts/default/AppBar/index.vue';
import AppMessage from '@/components/layouts/AppMessage.vue';

@Component({
  name: 'default',
  components: { AppBar, AppMessage },
  middleware: ['authentication', 'theme']
})
export default class DefaultLayout extends Vue {};
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
  background-color: var(--v-white-base) !important;
}
</style>
