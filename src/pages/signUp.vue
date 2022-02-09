<template>
  <v-container fluid class="pa-0">
    <v-row
      class="signUpPage"
      align="center"
      justify="center"
      :align-md="undefined"
      :justify-md="undefined"
    >
      <v-col cols="10" sm="10" md="6" class="d-flex align-center justify-center formCol">
        <SignUpForm />
      </v-col>
      <v-col cols="6" class="pa-0 d-none d-md-flex">
        <BigImage
          title="See what&#39;s being written around the world."
          imageURL="https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_960_720.jpg"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import BigImage from '@/components/layouts/login/BigImage.vue';
import SignUpForm from '@/components/pages/signUp/SignUpForm.vue';

@Component({
  layout: 'clear',
  components: { BigImage, SignUpForm },
  head: {
    title: 'Sign up'
  }
})
export default class SignUpPage extends Vue {};
</script>

<style lang="scss" scoped>
.signUpPage {
  height: 100vh !important;
}

.formCol {
  height: 100vh !important;
}
</style>
