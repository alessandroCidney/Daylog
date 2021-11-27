<template>
  <v-app>
    <v-main>
      <v-container class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  middleware: 'authentication'
});
</script>