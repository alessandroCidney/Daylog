<template>
  <v-menu
    v-model="showMenu"
    :close-on-content-click="true"
    :nudge-width="300"
    offset-x
  >
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        v-bind="attrs"
        v-on="on"
      >
        <v-img
          :src="require('@/assets/images/profile-mock/man.jpg')"
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
              :src="require('@/assets/images/profile-mock/man.jpg')"
              alt="Profile photo"
            />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Fernando Silva</v-list-item-title>
            <v-list-item-subtitle>@fernandosilva</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list flat>
        <v-list-item-group>
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>

            <v-list-item-title>
              Profile
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-arrow-left</v-icon>
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
export default Vue.extend({
  data: () => ({
    showMenu: false,
  }),
});
</script>