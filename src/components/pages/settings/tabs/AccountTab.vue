<template>
  <div>
    <h2 class="mb-10">Account</h2>

    <h3 class="mb-5">User information</h3>

    <v-text-field
      label="Username"
      :value="firestoreUserUsername"
      prefix="@"
      :color="!theme.isDark ? 'space' : 'white'"
    />

    <v-text-field
      label="Email"
      :value="firestoreUserEmail"
      :color="!theme.isDark ? 'space' : 'white'"
    />

    <h3>Enabled auth methods</h3>

    <v-list>
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
  </div>
</template>

<script lang="ts">
import { Mixins, Component, Inject } from 'vue-property-decorator';
import { State } from 'vuex-class';

import { OnFirestoreUserData } from '@/mixins';

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
export default class AccountTabComponent extends Mixins(OnFirestoreUserData) {

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