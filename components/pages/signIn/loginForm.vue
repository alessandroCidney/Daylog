<template>
  <v-form class="signInForm">
    <h1 class="master-font mb-6 pageTitle">
      Sign in to Daylog
    </h1>

    <GoogleAuthButton text="Sign in with Google" />

    <div class="d-flex align-center justify-center">
      <v-divider class="mb-6" />

      <span class="px-2 mb-6 d-flex align-center justify-center grey--text">
        <small>Or sign in with Email and Password</small>
      </span>

      <v-divider class="mb-6" />
    </div>

    <v-text-field
      v-model="loginData.email"
      label="Email"
      placeholder="user@example.com"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

    <v-text-field
      v-model="loginData.password"
      label="Password"
      placeholder="At least 8 characters"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

    <v-btn
      color="space"
      block
      class="white--text mt-6"
      :loading="emailAuthLoading"
      @click="emailAuthSubmit"
    >
      <v-icon left>
        mdi-email
      </v-icon>

      Sign in with Email
    </v-btn>

    <p class="grey--text mt-2 mb-0">
      <small>Don't have an account? <NuxtLink to="signUp">Click here</NuxtLink></small>
    </p>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import GoogleAuthButton from '../../layouts/login/GoogleAuthButton.vue';

interface ILoginData {
  email: string;
  password: string;
};

interface Data {
  loginData: ILoginData;
};

interface Methods {
  emailAuthSubmit: () => void;
};

interface Computed {};

interface Props {
  emailAuthLoading: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({

  components: {
    GoogleAuthButton
  },

  data: () => ({
    loginData: {
      email: '',
      password: ''
    }
  }),

  props: {
    emailAuthLoading: Boolean,
  },

  methods: {
    emailAuthSubmit () {
      this.$emit('emailAuthSubmit', this.loginData);
    },
  }
});
</script>

<style lang="scss" scoped>
.signInForm {
  width: 30vw !important;
}

@media (max-width: 959px) {
  .signInForm {
    width: 70vw !important;
  }
}

.pageTitle {
  font-size: 24px;
}
</style>
