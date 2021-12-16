<template>
  <v-container fluid class="pa-0">
    <v-row class="signInPage">
      <v-col cols="6" class="pa-0">
        <BigImage
          title="Welcome back!<br>See what&#39;s being written around the world."
          imageURL="https://cdn.pixabay.com/photo/2016/11/21/13/01/backlit-1845281_960_720.jpg"
        />
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center formCol">
        <SignInForm />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import BigImage from '@/components/layouts/login/BigImage.vue';
import SignInForm from '@/components/pages/signIn/SignInForm.vue';

export default Vue.extend({
  layout: 'login',

  components: {
    BigImage,
    SignInForm
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
