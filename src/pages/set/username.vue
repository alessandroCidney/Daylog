<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="oneHundredPercentViewHeight">
      <v-col cols="5">
        <v-img :src="require('@/assets/svg/logo_dark.svg')" />
        <h1 class="mt-16">You haven't set your username yet...</h1>
        <v-form>
          <v-text-field
            label="Set your username"
            placeholder="Be creative!"
            color="space"
            prefix="@"
          />

          <h2>And if you want, you can...</h2>

          <v-file-input
            label="Set your profile photo"
            color="space"
            prepend-icon="mdi-camera-plus"
          />

          <v-file-input
            label="Set your profile background image"
            color="space"
            prepend-icon="mdi-tooltip-image"
          />

          <v-btn block color="space" class="light--text">
            Save changes
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  layout: 'clear'
})
export default class SetUsername extends Vue {

};
</script>
