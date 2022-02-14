<template>
  <v-app>
    <AppBar />

    <SideBar />

    <v-main class="defaultContainer">
      <Nuxt />
    </v-main>

    <AppMessage />
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import AppBar from '@/components/layouts/default/AppBar/index.vue';
import SideBar from '@/components/layouts/default/SideBar/index.vue';
import AppMessage from '@/components/layouts/AppMessage.vue';

@Component({
  name: 'default',
  components: { AppBar, AppMessage, SideBar },
  middleware: ['authentication', 'theme', 'definedUsername']
})
export default class DefaultLayout extends Vue {};
</script>

<style lang="scss">
.defaultContainer {
  background-color: var(--v-white-base) !important;
}
</style>
