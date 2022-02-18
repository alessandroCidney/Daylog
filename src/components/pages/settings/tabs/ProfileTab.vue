<template>
  <div>
    <h2 class="mb-10">Profile</h2>

    <h3 class="mb-5">Username</h3>

    <v-text-field
      label="Username"
      :value="firestoreUserUsername"
      color="space"
      prefix="@"
    />

    <h3 class="mb-5">Profile photo</h3>

    <v-row align="start" justify="start">
      <v-col cols="5">
        <div class="d-flex align-center justify-center flex-column">
          <v-img :src="firestoreUserProfileBackground" height="170px" width="600px" class="rounded-lg" />

          <v-avatar width="150px" height="150px" class="translateY">
            <v-img :src="firestoreUserProfilePhoto" />
          </v-avatar>
        </div>
      </v-col>

      <v-col cols="7">
        <v-file-input
          prepend-icon="mdi-camera-plus"
          placeholder="Change profile photo"
          :color="!theme.isDark ? 'space' : 'white'"
        />

        <v-file-input
          prepend-icon="mdi-tooltip-image"
          placeholder="Change background picture"
          :color="!theme.isDark ? 'space' : 'white'"
        />
      </v-col>
    </v-row>

    <div class="d-flex">
      <v-spacer />
      <v-btn color="space" class="light--text" depressed>Save changes</v-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Inject } from 'vue-property-decorator';

import { OnFirestoreUserData } from '@/mixins';

type TInjectedTheme = { isDark: boolean; };

@Component
export default class AccountTabComponent extends Mixins(OnFirestoreUserData) {
  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;
};
</script>