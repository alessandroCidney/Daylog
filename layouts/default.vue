<template>
  <v-app>
    <AppBar />

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
import AppBar from '@/components/layouts/default/AppBar/index.vue';

interface Data {
  message: boolean;
};

interface Methods {};
interface Computed {};
interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'default',
  
  middleware: ['authentication', 'theme'],

  data: () => ({
    message: true
  }),

  components: {
    AppBar,
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
</style>
