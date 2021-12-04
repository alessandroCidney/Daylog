<template>
  <v-container class="login-container d-flex align-center" fluid>
    <v-row align="center" justify="center">
      <v-col lg="5" md="6" sm="8">
        
        <v-card :loading="formLoading" height="70vh">
          <v-progress-linear slot="progress" indeterminate color="space" />

          <v-card-title class="d-flex align-center justify-center pa-0 flex-column">
            <v-img
              max-width="150px"
              :src="require('@/assets/svg/logo_dark.svg')"
            />
          </v-card-title>

          <v-card-text class="px-10 mt-7">
            <v-form
              v-model="validData"
            >
              <v-btn
                color="#FFF"
                class="google-red-text"
                block
                @click="handleSignInWithGoogle"
              >
                <v-icon class="mr-3" size="20px">
                  mdi-google
                </v-icon>
                Sign in with Google
              </v-btn>

              <p class="mt-5">Or login with email and password</p>
            
              <v-text-field
                v-model="loginData.email"
                label="E-mail"
                placeholder="Type your e-mail"
                color="space"
              ></v-text-field>

              <v-text-field
                v-model="loginData.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                label="Password"
                placeholder="Type your password"
                color="space"
                class="mb-2"
              />

              <v-btn
                color="space"
                class="white--text mt-5"
                block
                @click="handleSignInWithEmail()"
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

import Authentication, { IAuthentication } from '@/services/authentication/index';

interface LoginData {
  email: string;
  password: string;
};

interface Data {
  formLoading: boolean;
  showPassword: boolean;
  authenticationService: IAuthentication | null;
  validData: boolean;
  loginData: LoginData;
};

interface Methods {
  handleSignInWithGoogle: () => void;
  handleSignInWithEmail: () => void;
};

interface Props {};
interface Computed {};

export default Vue.extend<Data, Methods, Computed, Props>({
  layout: 'login',

  data: () => ({
    formLoading: false,
    showPassword: false,
    authenticationService: null,
    validData: false,
    loginData: {
      email: '',
      password: '',
    },
  }),

  created () {
    this.authenticationService = new Authentication();
  },

  methods: {
    handleSignInWithGoogle () {
      this.authenticationService?.signInWithGoogle();
    },

    async handleSignInWithEmail () {
      await this.authenticationService?.signInWithEmail(
        this.loginData.email,
        this.loginData.password
      );
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
