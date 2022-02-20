<template>
  <v-container>
    <h1 class="mb-10">Settings</h1>

    <v-tabs vertical color="space" background-color="base">
      <v-tab class="base">Profile</v-tab>
      <v-tab class="base">Appearance</v-tab>
      <v-tab class="base">Account</v-tab>
      <v-tab class="base">Data</v-tab>

      <v-tab-item class="base"><ProfileTab /></v-tab-item>
      <v-tab-item class="base"><AppearanceTab /></v-tab-item>
      <v-tab-item class="base"><AccountTab /></v-tab-item>
      <v-tab-item class="base"><DataTab /></v-tab-item>
    </v-tabs>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import AccountTab from '@/components/pages/settings/tabs/AccountTab.vue';
import ProfileTab from '@/components/pages/settings/tabs/ProfileTab.vue';
import AppearanceTab from '@/components/pages/settings/tabs/AppearanceTab.vue';
import DataTab from '@/components/pages/settings/tabs/DataTab.vue';

import OnSetUserData from '@/mixins/OnSetUserData';

import _ from 'lodash';

@Component({
  components: { AccountTab, ProfileTab, AppearanceTab, DataTab }
})
export default class SettingsPage extends Mixins(OnSetUserData) {};
</script>

<style lang="scss">
.avatarPhoto {
  border: 3px solid #FFF;
  transform: translateY(-99px) !important;
}

.photosArea ~ * {
  transform: translateY(-99px) !important;
}

.profilePhotoLoader {
  transform: translateY(-99px) !important;

  background-color: var(--v-light-base);
  border: 3px solid #FFF !important;
  border-radius: 50% !important;

  display: flex !important;
  align-items: center !important;
  justify-content: center !important;

  .v-skeleton-loader__image {
    border-radius: 50% !important;
    width: 150px !important;
    height: 150px !important;
  }
}

.zeroWidth {
  width: 0 !important;
  height: 0 !important;
  min-width: 0 !important;
  border: 0 !important;
}

.translateY {
  transform: translateY(-50%);
}
</style>
