<template>
  <div>
    <h2 class="mb-10">Appearance</h2>

    <h3 class="mb-5">Theme</h3>

    <h4>Change theme</h4>

    <p>
      Change the theme according to your preferences. Options include a light version and a dark version.
    </p>

    <v-switch
      :input-value="!theme.isDark"
      color="yellow"
      prepend-icon="mdi-brightness-4"
      label="Switch theme"
      @change="changeTheme"
    />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Mixins } from 'vue-property-decorator';
import { Action } from 'vuex-class';

import { OnSetUserData } from '@/mixins';

type TInjectedTheme = {
  isDark: boolean;
};

@Component
export default class AppearanceTab extends Mixins(OnSetUserData) {
  @Inject({ default: { isDark: false } }) theme!: TInjectedTheme;

  @Action getCurrentFirestoreUser!: () => Promise<void>;

  async changeTheme (lightTheme: boolean) {
    console.log('CHANGE THEME', lightTheme)
    this.$vuetify.theme.dark = !lightTheme;
    await this.usersService?.changeTheme(!lightTheme);
    await this.getCurrentFirestoreUser();
  };
};
</script>
