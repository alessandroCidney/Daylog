<template>
  <v-container fluid class="pa-0">
    <v-row
      class="signInPage"
      align="center"
      justify="center"
      :align-md="undefined"
      :justify-md="undefined"
    >
      <v-col cols="6" class="pa-0 d-none d-md-flex">
        <BigImage
          title="Welcome back!<br>See what&#39;s being written around the world."
          imageURL="https://cdn.pixabay.com/photo/2016/11/21/13/01/backlit-1845281_960_720.jpg"
        />
      </v-col>
      <v-col cols="10" sm="10" md="6" class="d-flex align-center justify-center formCol">
        <LoginForm
          :emailAuthLoading="emailAuthLoading"
          @emailAuthSubmit="handleSignInWithEmail"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';

import BigImage from '@/components/layouts/login/BigImage.vue';
import LoginForm from '@/components/pages/signIn/loginForm.vue';

import Authentication, { IAuthentication } from '@/services/authentication/index';
import { TApplicationMessage } from '@/types/messages';

interface ILoginData {
  email: string;
  password: string;
};

interface Data {
  emailAuthLoading: boolean;
  showPassword: boolean;
  authenticationService: IAuthentication | null;
};

interface Methods {
  handleSignInWithEmail: (loginData: ILoginData) => Promise<void>;
  showAppMessage: (message: TApplicationMessage) => void;
};

interface Props {};

interface Computed {
  lightTheme: boolean;
  isAuthenticated: boolean;
};

export default Vue.extend<Data, Methods, Computed, Props>({
  layout: 'login',

  components: {
    BigImage,
    LoginForm
  },

  data: () => ({
    emailAuthLoading: false,
    showPassword: false,
    authenticationService: null,
  }),

  created () {
    this.authenticationService = new Authentication();
  },

  computed: {
    ...mapGetters(['isAuthenticated']),

    lightTheme () {
      return !this.$vuetify.theme.dark;
    },
  },

  watch: {
    isAuthenticated (v) {
      if (!!v) {
        this.$router.push('/home');
      };
    }
  },

  methods: {
    ...mapMutations(['showAppMessage']),

    async handleSignInWithEmail (loginData: ILoginData) {
      this.emailAuthLoading = true;

      if (!this.authenticationService) {
        return;
      };

      const results = await this.authenticationService.signInWithEmail(
        loginData.email,
        loginData.password
      );

      if (results.status === 'error') {
        this.showAppMessage(results);
      };

      this.emailAuthLoading = false;
    }
  }
})
</script>

<style lang="scss" scoped>
.signInPage {
  height: 100vh !important;
}

.formCol {
  height: 100vh !important;
}
</style>
