<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="false"
    :nudge-width="300"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        v-bind="attrs"
        v-on="on"
        :class="!avatarLoaded && 'invisible-avatar'"
      >
        <v-img
          :src="firestoreUserProfilePhoto || require('@/assets/images/profile/user.jpg')"
          alt="Profile photo"
          :width="avatarLoaded ? '46px' : '0'"
          @load="avatarLoaded = true"
        />
      </v-avatar>

      <v-skeleton-loader
        v-if="!avatarLoaded"
        type="avatar"
        class="avatar-loader"
      />
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              :src="firestoreUserProfilePhoto || require('@/assets/images/profile/user.jpg')"
              alt="Profile photo"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="overflow-200 master-font">@{{ firestoreUserUsername }}</v-list-item-title>
            <v-list-item-subtitle class="overflow-200">{{ firestoreUserEmail }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon to="/settings" @click="showMenu = false">
              <v-icon color="space">mdi-cog</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list flat>
        <v-list-item-group>

          <v-list-item to="/home" @click="showMenu = false">
            <v-list-item-icon>
              <v-icon color="space">mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/users/me" @click="showMenu = false">
            <v-list-item-icon>
              <v-icon color="space">mdi-account-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              Profile
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleSignOut">
            <v-list-item-icon>
              <v-icon color="space">mdi-arrow-left</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              Sign out
            </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import { OnFirestoreUserData } from '@/mixins';

import Authentication from '@/services/authentication';
import Database from '@/services/database';

@Component
export default class PopoverMenuComponent extends Mixins(OnFirestoreUserData) {
  showMenu = false;
  authenticationService = new Authentication();
  usersDatabase = new Database('users');
  avatarLoaded = false;

  async handleSignOut () {
    this.showMenu = false;
    await this.authenticationService.signOut();
    this.$router.push('/signIn');
  }
};
</script>

<style lang="scss">
.avatar-loader.v-skeleton-loader.v-skeleton-loader--is-loading {
  .v-skeleton-loader__image {
    width: 46px;
  }
}

.invisible-avatar {
  width: 0 !important;
  min-width: 0 !important;
  height: 0 !important;
}
</style>