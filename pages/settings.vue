<template>
  <v-container>
    <div class="d-flex flex-column align-center justify-center">
      <v-btn
        color="error"
        class="white--text"
        width="50%"
        @click="handleDeleteAccount"
      >
        Excluir minha conta
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Authentication, { IAuthentication } from '@/services/authentication'

interface Data {
  authenticationService: IAuthentication | null;
};
interface Methods {};
interface Computed {};
interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    authenticationService: null
  }),

  created () {
    this.authenticationService = new Authentication();
  },

  methods: {
    async handleDeleteAccount () {
      await this.authenticationService?.deleteAccount();
    }
  }
});
</script>
