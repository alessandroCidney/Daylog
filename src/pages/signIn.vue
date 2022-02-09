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
        <LoginForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { mapGetters, mapMutations } from 'vuex';

import BigImage from '@/components/layouts/login/BigImage.vue';
import LoginForm from '@/components/pages/signIn/LoginForm.vue';

@Component({
  layout: 'clear',
  components: { BigImage, LoginForm },
  head: {
    title: 'Sign in'
  }
})
export default class SignInPage extends Vue {};
</script>

<style lang="scss" scoped>
.signInPage {
  height: 100vh !important;
}

.formCol {
  height: 100vh !important;
}
</style>
