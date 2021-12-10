<template>
  <v-container
    :class="{
      'login-container': true,
      'login-container-dark': !lightTheme,
      'd-flex': true, 
      'align-center': true
    }"
    fluid
  >
    <v-row align="center" justify="center">
      <v-col lg="6" md="6" sm="8">
        
        <v-card class="pa-0" :loading="formLoading">
          <v-progress-linear slot="progress" indeterminate color="space" />
          
            <v-stepper tile flat v-model="step" color="space">
              <v-stepper-header class="px-10">
                <v-stepper-step
                  step="1"
                  color="space"
                >
                  Personal information
                </v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  step="2"
                  color="space"
                >
                  Profile photo
                </v-stepper-step>
              </v-stepper-header>

              <v-stepper-items>
                <v-stepper-content step="1">
                  <v-card-text>
                    <p>Please, type your email and password in the fields below</p>

                    <v-form v-model="signUpValid">  

                      <v-text-field
                        v-model="signUpData.username"
                        label="Username"
                        placeholder="Type a username"
                        color="space"
                        class="pb-0"
                        :rules=[required]
                      ></v-text-field>

                      <v-text-field
                        v-model="signUpData.email"
                        label="E-mail"
                        placeholder="Type your e-mail"
                        color="space"
                        class="py-0"
                        :rules=[required]
                      ></v-text-field>

                      <v-text-field
                        v-model="signUpData.password"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        label="Password"
                        placeholder="Type your password"
                        color="space"
                        class="py-0 mb-2"
                        :rules=[required]
                      />

                      <v-checkbox
                        v-model="signUpData.termsAgree"
                        label="I agree with the use terms and with the cookies use policy"
                        color="space"
                        class="py-0"
                        dense
                        :rules=[required]
                      />

                      <v-checkbox
                        v-model="signUpData.privacyAgree"
                        label="I agree with the privacy policy"
                        color="space"
                        class="py-0"
                        dense
                        :rules=[required]
                      />

                      <v-btn
                        color="#FFF"
                        class="google-red-text"
                        block
                        :disabled="!signUpValid"
                      >
                        <v-icon class="mr-3" size="20px">
                          mdi-google
                        </v-icon>
                        Sign up with Google
                      </v-btn>

                      <v-btn
                        color="space"
                        class="white--text mt-5"
                        block
                        @click="step = 2"
                        :disabled="!signUpValid"
                      >
                        Next
                      </v-btn>
                    </v-form>

                    <p class="mt-4">
                      Have an account? 
                      <nuxt-link to="/signIn" class="text-decoration-none">
                        click here
                      </nuxt-link>
                    </p>
                  </v-card-text>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card-text>
                    <p>Choose your profile photo!</p>
                    <v-file-input
                      v-model="signUpData.profilePhoto"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera-plus"
                      label="Avatar"
                    ></v-file-input>

                    <p>Choose your profile background image</p>
                    <v-file-input
                      v-model="signUpData.profileBackground"
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an image"
                      prepend-icon="mdi-tooltip-image"
                      label="Profile background image"
                    ></v-file-input>
                  </v-card-text>
                  
                  <v-row>
                    <v-col cols="6">
                      <v-btn
                        color="space"
                        text
                        block
                        @click="step = 1"
                      >
                        Previous
                      </v-btn>
                    </v-col>

                    <v-col cols="6">
                      <v-btn
                        color="space"
                        class="white--text"
                        @click="handleSignUpWithEmail"
                        block
                        :disabled="!signUpValid"
                      >
                        Sign up
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Authentication, { IAuthentication } from '@/services/authentication';

interface ISignUpData {
  username: string;
  email: string;
  password: string;
  profilePhoto: File | undefined;
  profileBackground: File | undefined;
  privacyAgree: boolean;
  termsAgree: boolean;
};

interface Data {
  signUpData : ISignUpData;
  loading: boolean;
  signUpValid: boolean;
  authenticationService: IAuthentication | null;
};

interface Methods {};

interface Computed {
  formLoading: boolean;
  lightTheme: boolean;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  layout: 'login',

  data: () => ({
    step: "1",
    loading: false,
    showPassword: false,
    signUpData: {
      username: '',
      email: '',
      password: '',
      profilePhoto: undefined,
      profileBackground: undefined,
      privacyAgree: false,
      termsAgree: false,
    },
    signUpValid: false,
    authenticationService: null
  }),

  created () {
    this.authenticationService = new Authentication();
  },

  computed: {
    formLoading: {
      get () {
        return this.loading;
      },

      set (v: boolean) {
        this.loading = v;
      },
    },

    lightTheme () {
      return !this.$vuetify.theme.dark;
    },
  },

  methods: {
    required (v: boolean) {
      if (!v) {
        return false
      }

      return true;
    },

    async handleSignUpWithEmail () {
      this.$nuxt.$loading.start();

      const success = await this.authenticationService?.signUpWithEmail(
        this.signUpData.email,
        this.signUpData.password,
        this.signUpData.username,
        this.signUpData.profilePhoto,
        this.signUpData.profileBackground,
        this.signUpData.termsAgree,
        this.signUpData.privacyAgree
      );

      this.$nuxt.$loading.finish();
      
      if (success) {
        this.$router.push('/home');
      }
    },
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

.login-container-dark {
  background-image: url('@/assets/images/b-background-dark.jpg') !important;
}
</style>
