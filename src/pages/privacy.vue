<template>
  <v-container class="pt-10">
    <h1 class="privacy-title">Privacy Policy</h1>

    <h2>Introduction</h2>

    <p>
      Welcome to Logbook privacy policy. This documents contains informations about how we collect, use and share your data. 
    </p>
  </v-container>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator';

@Component({
  layout: 'eula'
})
export default class PrivacyPage {};
</script>

<style lang="scss" scoped>
.privacy-title {
  font-size: 5em !important;
  font-weight: 900 !important;
}
</style>
