<template>
  <v-container class="login-container d-flex align-center">
    <v-row align="center" justify="center">
      <v-col lg="6" md="6" sm="8">
        
        <v-card class="pa-0" :loading="formLoading">
          <v-progress-linear slot="progress" indeterminate color="space" />

          <v-form>
          
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

                    <v-text-field
                      label="Username"
                      placeholder="Type a username"
                      color="space"
                      class="pb-0"
                    ></v-text-field>

                    <v-text-field
                      label="E-mail"
                      placeholder="Type your e-mail"
                      color="space"
                      class="py-0"
                    ></v-text-field>

                    <v-text-field
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      hint="At least 8 characters"
                      @click:append="showPassword = !showPassword"
                      label="Password"
                      placeholder="Type your password"
                      color="space"
                      class="py-0 mb-2"
                    />

                    <v-checkbox
                      label="I agree with the use terms and with the cookies use policy"
                      value="terms_and_privacy_agree"
                      color="space"
                      class="py-0"
                      dense
                    />

                    <v-checkbox
                      label="I agree with the privacy policy"
                      value="terms_and_privacy_agree"
                      color="space"
                      class="py-0"
                      dense
                    />

                    <v-btn
                      color="#FFF"
                      class="google-red-text"
                      block
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
                    >
                      Next
                    </v-btn>
                  </v-card-text>
                </v-stepper-content>

                <v-stepper-content step="2">
                  <v-card-text>
                    <p>Choose your profile photo!</p>
                    <v-file-input
                      accept="image/png, image/jpeg, image/bmp"
                      placeholder="Pick an avatar"
                      prepend-icon="mdi-camera-plus"
                      label="Avatar"
                    ></v-file-input>

                    <p>Choose your profile background image</p>
                    <v-file-input
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
                        @click="step = 3"
                        block
                      >
                        Next
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </v-form>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'login',

  data: () => ({
    step: "1",
    loading: false,
    showPassword: false,
  }),

  computed: {
    formLoading: {
      get () {
        return this.loading;
      },

      set (v: boolean) {
        this.loading = v;
      },
    }
  },
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
