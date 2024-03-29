<template>
  <div>
    <h2 class="mb-10">Account</h2>

    <h3 class="mb-5">User information</h3>

    <v-text-field
      label="Email"
      readonly
      :value="firestoreUserEmail"
      :color="!theme.isDark ? 'space' : 'white'"
    />

    <h3 class="mb-5">Enabled auth methods</h3>

    <v-list class="mb-10">
      <v-list-item v-for="(provider, index) in userAuthProviders" :key="'authProvider' + index">
        <v-list-item-avatar>
          <v-icon :class="provider.icon.color" dark>{{ provider.icon.name }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ provider.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ provider.description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <h3 class="mb-5">Danger zone</h3>

    <v-btn block class="mb-2 error--text" depressed>Delete my account</v-btn>
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Inject } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { OnSetUserData } from '@/mixins';

import { StoreUser } from '@/types/users';

type TProviderData = {
  icon: {
    color: string;
    name: string;
  };
  name: string;
  description: string;
};

type TInjectedTheme = { isDark: boolean; };

@Component
export default class AccountTabComponent extends Mixins(OnSetUserData) {

  @Inject({ default: { isDark: false } }) readonly theme!: TInjectedTheme;
  @State user!: StoreUser | null;

  get userAuthProviders () {
    function getProviderData (providerId: string): TProviderData | undefined {
      switch (providerId) {
        case 'password':
          return ({
            icon: {
              color: 'space',
              name: 'mdi-email'
            },
            name: 'Email and password',
            description: 'Allows authentication using email and password'
          });
          break;
        case 'google.com':
          return ({
            icon: {
              color: 'red lighten-1',
              name: 'mdi-google'
            },
            name: 'Google',
            description: 'Allows authentication using Google services'
          });
          break;
      };
    };

    let providers: TProviderData[] = [];

    if (!this.user || !this.user.authUser) return providers;

    providers = this.user.authUser.authProviders
      .map(id => getProviderData(id))
      .filter(e => !!e) as TProviderData[];

    return providers;
  };
};
</script>