<template>
  <v-container class="login-container d-flex align-center">
    <v-row align="center" justify="center">
      <v-col lg="5" md="6" sm="8">
        
        <v-card :loading="formLoading" height="70vh">
          <v-progress-linear slot="progress" indeterminate color="#000" />

          <v-card-title class="d-flex align-center justify-center pa-0 flex-column">
            <v-img
              max-width="150px"
              :src="require('@/assets/svg/logo_dark.svg')"
            />
          </v-card-title>

          <v-card-text class="px-10 mt-7">
            <v-form>

              <v-btn
                color="#FFF"
                class="google-red-text"
                block
                @click="handleAuthenticateWithGoogle"
              >
                <v-icon class="mr-3" size="20px">
                  mdi-google
                </v-icon>
                Sign in with Google
              </v-btn>

              <p class="mt-5">Or login with email and password</p>
            
              <v-text-field
                label="E-mail"
                placeholder="Type your e-mail"
                color="#000"
              ></v-text-field>

              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                label="Password"
                placeholder="Type your password"
                color="#000"
                class="mb-2"
              />

              <v-btn
                color="#000"
                class="white--text mt-5"
                block
              >
                Login with email
              </v-btn>

            </v-form>
          </v-card-text>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

import { IGoogleAuthentication } from '@/services/firebase/authentication';
import { GoogleAuthentication } from '@/services/firebase';

interface Data {
  formLoading: boolean;
  showPassword: boolean;
  authenticationService: IGoogleAuthentication | undefined;
};

interface Methods {
  handleAuthenticateWithGoogle: () => void;
  handleGetGoogleAuth: () => void;
};

interface Props {};
interface Computed {};

export default Vue.extend<Data, Methods, Computed, Props>({
  layout: 'login',

  data: () => ({
    formLoading: false,
    showPassword: false,
    authenticationService: undefined,
  }),

  created () {
    this.authenticationService = new GoogleAuthentication();
  },

  mounted () {
    this.handleGetGoogleAuth();
  },

  methods: {
    async handleAuthenticateWithGoogle () {
      await this.authenticationService?.authWithGoogleRedirect();
    },

    async handleGetGoogleAuth () {
      const authData = await this.authenticationService?.getGoogleAuthResults();
      console.log('AUTH', authData)
    }
  }
});
</script>

<style lang="scss">
.login-container {
  height: 100vh;

  background-image: url('@/assets/images/b-background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
