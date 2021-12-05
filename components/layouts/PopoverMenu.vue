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
      >
        <v-img
          :src="profilePhoto"
          alt="Profile photo"
          width="46px"
        />
      </v-avatar>
    </template>

    <v-card>
      <v-list>
        <v-list-item>
          <v-list-item-avatar>
            <v-img
              :src="profilePhoto"
              alt="Profile photo"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="overflow-200">{{ user.firestoreUser.username }}</v-list-item-title>
            <v-list-item-subtitle class="overflow-200">Iniciante</v-list-item-subtitle>
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

          <v-list-item to="/me" @click="showMenu = false">
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
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { StoreUser } from '@/types/users';

import Authentication, { IAuthentication } from '@/services/authentication/index';

interface Data {
  showMenu: boolean;
  authenticationService: IAuthentication | null;
};

interface Methods {
  handleSignOut: () => Promise<void>;
};

interface Computed {
  user: StoreUser | null;
  profilePhoto: string;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    showMenu: false,
    authenticationService: null,
  }),

  created () {
    this.authenticationService = new Authentication();
  },

  computed: {
    ...mapGetters(['user']),

    profilePhoto () {
      if (this.user && this.user.firestoreUser.profile_photo) {
        return this.user.firestoreUser.profile_photo;
      };

      return '';
    }
  },

  methods: {
    async handleSignOut () {
      this.showMenu = false;
      await this.authenticationService?.signOut();
      this.$router.push('/signIn');
    }
  }
});
</script>