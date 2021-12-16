<template>
  <v-container fluid class="pa-0">
    <v-row class="signUpPage">
      <v-col cols="6" class="d-flex align-center justify-center formCol">
        <SignUpForm />
      </v-col>
      <v-col cols="6" class="pa-0">
        <BigImage
          title="See what&#39;s being written around the world."
          imageURL="https://cdn.pixabay.com/photo/2020/04/30/20/14/sky-5114501_960_720.jpg"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import BigImage from '@/components/layouts/login/BigImage.vue';
import SignUpForm from '@/components/pages/signUp/SignUpForm.vue';

export default Vue.extend({
  layout: 'login',

  components: {
    BigImage,
    SignUpForm
  }
});
</script>

<style lang="scss" scoped>
.signUpPage {
  height: 100vh !important;
}

.formCol {
  height: 100vh !important;
}
</style>
