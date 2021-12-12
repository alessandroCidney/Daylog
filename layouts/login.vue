<template>
  <v-app>
    <v-main>
      <v-container class="pa-0" fluid>
        <Nuxt />
      </v-container>
    </v-main>

    <AppMessage />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AppMessage from '@/components/layouts/AppMessage.vue';

interface Data {};
interface Methods {};
interface Computed {};
interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  middleware: 'authentication',

  components: {
    AppMessage
  }
});
</script>