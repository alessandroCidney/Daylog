<template>
  <v-form class="signInForm">
    <h1 class="master-font mb-6 pageTitle">
      Sign in to <span class="master-font font-weight-black">Logbook</span>
    </h1>

    <GoogleAuthButton text="Sign in with Google" />

    <div class="d-flex align-center justify-center">
      <v-divider class="mb-6" />

      <span class="px-2 mb-6 d-flex align-center justify-center grey--text">
        <small>Or sign in with email and password</small>
      </span>

      <v-divider class="mb-6" />
    </div>

    <v-text-field
      v-model="email"
      label="Email"
      placeholder="user@example.com"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

    <v-text-field
      v-model="password"
      label="Password"
      placeholder="At least 8 characters"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

    <v-btn
      block
      color="space"
      class="white--text mt-6"
      :loading="loading"
      @click="signInWithEmail"
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
import { Vue, Component, Watch } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';

import Authentication from '@/services/authentication';

import GoogleAuthButton from '@/components/layouts/login/GoogleAuthButton.vue';

import { TApplicationMessage, TSnackbarMessage } from '@/types/messages';
import { StoreUser } from '@/types/users';

@Component({
  components: { GoogleAuthButton }
})
export default class LoginFormComponent extends Vue {
  email = '';
  password = '';
  loading = false;
  authenticationService = new Authentication();

  @State user!: StoreUser | null;
  @Mutation showAppMessage!: (payload: TApplicationMessage | TSnackbarMessage) => void;

  @Watch('user', { deep: true })
  redirectUser (user: StoreUser | null) {
    if (user && user.firestoreUser) {
      this.$router.push('/home');
    };
  };

  async signInWithEmail () {
    this.loading = true;

    try {
      const data = await this.authenticationService.signInWithEmail(this.email, this.password);

      if (data.status === 'error') {
        this.loading = false;
        this.showAppMessage(data);
        return;
      };

    } catch (error) {
      console.log('Error during signInWithEmail execution', error);
      this.loading = false;
    };
  };
};
</script>

<style lang="scss" scoped>
.signInForm {
  width: 25vw !important;
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
