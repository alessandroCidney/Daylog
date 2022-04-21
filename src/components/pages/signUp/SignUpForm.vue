<template>
  <v-form class="signUpForm">
    <h1 class="master-font mb-6 pageTitle">
      Sign up to <span class="master-font font-weight-black">Logbook</span>
    </h1>

    <GoogleAuthButton text="Sign up with Google" />

    <div class="d-flex align-center justify-center">
      <v-divider class="mb-6" />

      <span class="px-2 mb-6 d-flex align-center justify-center grey--text">
        <small>Or sign up with email and password</small>
      </span>

      <v-divider class="mb-6" />
    </div>

    <v-text-field
      v-model="username"
      label="Username"
      placeholder="Type a username"
      outlined
      color="space"
      hide-details
      class="mb-5"
    />

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
    />

    <v-checkbox
      v-model="acceptedUseTermsPrivacyPolicyAndCookiesUsePolicy"
      color="space"
    >
      <span slot="label">
        I agree with the use terms,
        <nuxt-link to="/privacy">privacy policy</nuxt-link> and
        cookies use policy
      </span>
    </v-checkbox>

    <v-btn color="space" block class="white--text mt-2" :loading="loading" @click="signUpWithEmail">
      <v-icon left>
        mdi-email
      </v-icon>

      Sign up with Email
    </v-btn>

    <p class="grey--text mt-2 mb-0">
      <small>Have an account? <NuxtLink to="login">Click here</NuxtLink></small>
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
export default class SignUpFormComponent extends Vue {
  username = '';
  email = '';
  password = '';
  acceptedUseTermsPrivacyPolicyAndCookiesUsePolicy = false;
  authenticationService = new Authentication();
  loading = false;

  @State user!: StoreUser | null;
  @Mutation showAppMessage!: (payload: TApplicationMessage | TSnackbarMessage) => void;

  @Watch('user', { deep: true })
  redirectUser (user: StoreUser | null) {
    if (user && user.firestoreUser) {
      this.$router.push('/home');
    };
  };

  async signUpWithEmail () {
    this.loading = true;

    try {
      const data = await this.authenticationService.signUpWithEmail(this.email, this.password, this.username, this.acceptedUseTermsPrivacyPolicyAndCookiesUsePolicy);

      if (data.status === 'error') {
        this.loading = false;
        this.showAppMessage(data);
        return;
      };

      await this.authenticationService.signOut();
      await this.authenticationService.signInWithEmail(this.email, this.password);

    } catch (error) {
      console.log('Error during signUpWithEmail execution', error);
      this.loading = false;
    };
  };
};
</script>

<style lang="scss" scoped>
.signUpForm {
  width: 25vw !important;
}

@media (max-width: 959px) {
  .signUpForm {
    width: 70vw !important;
  }
}

.pageTitle {
  font-size: 24px;
}
</style>
