<template>
  <v-container>
    <h1 class="mb-10">Settings</h1>

    <v-tabs vertical color="space">
      <v-tab>Profile</v-tab>
      <v-tab>Appearance</v-tab>
      <v-tab>Account</v-tab>
      <v-tab>Notifications</v-tab>
      <v-tab>Data</v-tab>

      <v-tab-item><ProfileTab /></v-tab-item>
      <v-tab-item><AppearanceTab /></v-tab-item>
      <v-tab-item><AccountTab /></v-tab-item>

      <v-tab-item>
        <h2 class="mb-10">Notifications</h2>
      </v-tab-item>

      <v-tab-item>
        <h2 class="mb-10">Data</h2>
      </v-tab-item>
    </v-tabs>

    <v-row align="center" justify="center" class="my-10" v-if="false">
      <v-col md="8" sm="10" cols="10" class="light rounded-xl pa-0">
        <v-row align="center" justify="center" class="photosArea">
          <v-col cols="12">
            <v-img
              width="100%"
              :height="backgroundPhotoLoaded ? '200px' : 0"
              class="overflow-hidden rounded-t-xl"
              :src="firestoreUserProfileBackground || require('@/assets/images/b-background.jpg')"
              @load="backgroundPhotoLoaded = true"
            />

            <v-skeleton-loader
              v-if="!backgroundPhotoLoaded"
              type="image"
              width="100%"
              height="200px"
            />
          </v-col>

          <v-col cols="6" class="d-flex align-center justify-center">
            <v-avatar
              :width="profilePhotoLoaded ? '150px' : 0"
              :height="profilePhotoLoaded ? '150px' : 0"
              :class="{
                'avatarPhoto': true ,
                'zeroWidth': !profilePhotoLoaded
              }"
            >
              <v-img
                :src="firestoreUserProfilePhoto || require('@/assets/images/profile/user.jpg')"
                alt="Avatar photo"
                :width="profilePhotoLoaded ? '150px' : 0"
                :height="profilePhotoLoaded ? '150px' : 0"
                @load="profilePhotoLoaded = true"
              />
            </v-avatar>

            <v-skeleton-loader
              v-if="!profilePhotoLoaded"
              class="profilePhotoLoader"
              type="image"
              width="150px"
              height="150px"
            />
          </v-col>
        </v-row>

        <v-row class="pa-4">
          <v-col cols="6" class="d-flex align-center justify-start">
            <v-switch
              v-model="lightTheme"
              color="yellow"
              prepend-icon="mdi-brightness-4"
            />
          </v-col>

          <v-col cols="6" class="d-flex align-center justify-end">
            <v-btn
              text
              @click="allowEdit = true"
            >
              <v-icon color="space" left>mdi-pencil</v-icon>
              Edit
            </v-btn>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="pa-4">
          <v-col cols="12">
            <v-text-field
              v-model="changes.username"
              label="Username"
              :value="firestoreUserUsername"
              prefix="@"
              :disabled="!allowEdit"
              :color="lightTheme ? 'space' : 'white'"
            />
          </v-col>

          <v-col cols="6">
            <v-file-input
              v-model="changes.profilePhoto"
              prepend-icon="mdi-camera-plus"
              placeholder="Change profile photo"
              :disabled="!allowEdit"
              :color="lightTheme ? 'space' : 'white'"
            />
          </v-col>

          <v-col cols="6">
            <v-file-input
              v-model="changes.profileBackgroundPhoto"
              prepend-icon="mdi-tooltip-image"
              placeholder="Change profile background photo"
              :disabled="!allowEdit"
              :color="lightTheme ? 'space' : 'white'"
            />
          </v-col>
        </v-row>

        <v-row align="center" justify="center" class="pa-4">
          <v-col cols="12">
            <v-btn
              color="space"
              class="white--text"
              width="100%"
              :loading="saveChangesLoading"
              @click="handleSaveChanges"
            >
              Save changes
            </v-btn>
          </v-col>
          
          <v-col cols="12">
            <v-btn
              color="error"
              class="white--text"
              width="100%"
              :loading="deleteAccountLoading"
              @click="handleDeleteAccount"
            >
              Delete my account
            </v-btn>
          </v-col>

          <v-col cols="12">
            <v-btn
              plain
              width="100%"
              @click="handleDownloadAccountData"
            >
              Download account data
            </v-btn>
          </v-col>
        </v-row>
      </v-col>  
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';

import AccountTab from '@/components/pages/settings/tabs/AccountTab.vue';
import ProfileTab from '@/components/pages/settings/tabs/ProfileTab.vue';
import AppearanceTab from '@/components/pages/settings/tabs/AppearanceTab.vue';

import Authentication from '@/services/authentication';
import OnSetUserData from '@/mixins/OnSetUserData';

import _ from 'lodash';

@Component({
  components: { AccountTab, ProfileTab, AppearanceTab }
})
export default class SettingsPage extends Mixins(OnSetUserData) {
  authenticationService = new Authentication();
  allowEdit = false;
  lightTheme = !this.$vuetify.theme.dark;
  backgroundPhotoLoaded = false;
  profilePhotoLoaded = false;
  deleteAccountLoading = false;


  created () {
    this.changes.username = this.firestoreUserUsername;
  };

  @Watch('lightTheme')
  async onLightThemeChanged (activeLightTheme: boolean) {
    this.$vuetify.theme.dark = !activeLightTheme;
    await this.usersService?.changeTheme(!activeLightTheme);
    await this.getCurrentFirestoreUser();
  };

  async handleDeleteAccount () {
    this.deleteAccountLoading = true;

    if (!this.firestoreUserId || !this.firestoreUserEmail) return;

    await this.authenticationService.deleteAccount(
      this.firestoreUserId,
      this.firestoreUserEmail
    );

    this.deleteAccountLoading = false;
    this.$router.push('/');
  };

  async handleDownloadAccountData () {
    const fileDataURL = await this.usersService?.getAccountData() || '';
    
    const anchor = document.createElement('a');
    anchor.classList.add('dont-show');
    anchor.setAttribute('href', fileDataURL);
    anchor.setAttribute('download', 'daylog.zip');

    document.body.appendChild(anchor);
    anchor.click();

    document.body.removeChild(anchor);
  };
};
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
