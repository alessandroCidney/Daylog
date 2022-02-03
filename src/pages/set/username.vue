<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="oneHundredPercentViewHeight">
      <v-col cols="5">
        <v-img :src="require('@/assets/svg/logo_dark.svg')" />
        <h1 class="mt-16">You haven't set your username yet...</h1>
        <v-form>
          <v-text-field
            v-model="changes.username"
            label="Set your username"
            placeholder="Be creative!"
            color="space"
            prefix="@"
          />

          <h2>And if you want, you can...</h2>

          <v-file-input
            v-model="changes.profilePhoto"
            label="Set your profile photo"
            color="space"
            prepend-icon="mdi-camera-plus"
          />

          <v-file-input
            v-model="changes.profileBackgroundPhoto"
            label="Set your profile background image"
            color="space"
            prepend-icon="mdi-tooltip-image"
          />

          <v-btn
            block
            color="space"
            class="light--text"
            :loading="saveChangesLoading"
            @click="handleSaveChanges"
          >
            Save changes
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import OnSetUserData from '@/mixins/OnSetUserData';

@Component({
  layout: 'clear'
})
export default class SetUsernamePage extends Mixins(OnSetUserData) {};
</script>
