<template>
  <v-container fluid class="pa-0">
    <v-row class="signUpPage">
      <v-col cols="6" class="d-flex align-center justify-center formCol">
        <v-form class="signUpForm">
          <h1 class="passero-one mb-6 pageTitle">
            Sign up to PontoBlog
          </h1>

          <v-btn color="error" block class="white--text mb-6">
            <v-icon left>
              mdi-google
            </v-icon>

            Sign up with Google
          </v-btn>

          <div class="d-flex align-center justify-center">
            <v-divider class="mb-6" />

            <span class="px-2 mb-6 d-flex align-center justify-center grey--text">
              <small>Or sign up with Email and Password</small>
            </span>

            <v-divider class="mb-6" />
          </div>

          <v-text-field
            label="Username"
            placeholder="Type a username"
            outlined
            color="space"
            hide-details
            class="mb-5"
          />

          <v-text-field
            label="Email"
            placeholder="user@example.com"
            outlined
            color="space"
            hide-details
            class="mb-5"
          />

          <v-text-field
            label="Password"
            placeholder="At least 8 characters"
            outlined
            color="space"
            hide-details
          />

          <v-checkbox
            label="I agree with the use terms, privacy policy and cookies use policy"
          />

          <v-btn color="space" block class="white--text mt-2">
            <v-icon left>
              mdi-email
            </v-icon>

            Sign up with Email
          </v-btn>

          <p class="grey--text mt-2 mb-0">
            <small>Have an account? <NuxtLink to="login">Click here</NuxtLink></small>
          </p>
        </v-form>
      </v-col>
      <v-col cols="6" class="pa-0">
        <v-img
          src="https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_960_720.jpg"
          class="signUpSkyImage"
          gradient="to top right, rgba(33, 33, 33, .6), rgba(33, 33, 33, .6)"
        >
          <h3 class="passero-one white--text pt-10 ml-10">
            See what&#39;s being written around the world.
          </h3>
        </v-img>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  layout: 'login',
})
</script>

<style lang="scss" scoped>
.signUpSkyImage {
  width: 100% !important;
  height: 100% !important;
}

.signUpPage {
  height: 100vh !important;
}

.signUpForm {
  width: 30vw !important;
}

.pageTitle {
  font-size: 24px;
}

.formCol {
  height: 100vh !important;
}
</style>
