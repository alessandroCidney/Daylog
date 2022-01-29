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
import { Vue, Component } from 'vue-property-decorator';
import AppMessage from '@/components/layouts/AppMessage.vue';

@Component({
  middleware: 'authentication',
  components: { AppMessage }
})
export default class LoginLayout extends Vue {};
</script>
