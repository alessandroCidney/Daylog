<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">

      <v-col cols="8">
        <v-row align="center" justify="center" class="photosArea">
          <v-col cols="12">
            <v-img
              width="100%"
              height="200px"
              class="overflow-hidden"
              :src="backgroundPhoto || require('@/assets/images/b-background.jpg')"
            />
          </v-col>

          <v-col cols="6" class="d-flex align-center justify-center">
            <v-avatar width="150px" height="150px" class="avatarPhoto">
              <v-img
                :src="profilePhoto || require('@/assets/images/profile/user.jpg')"
                alt="Avatar photo"
              />
            </v-avatar>
          </v-col>
        </v-row>

        <v-row>
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

        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-text-field
              v-model="changes.username"
              label="Username"
              :value="username"
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

        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn
              color="space"
              class="white--text"
              width="100%"
              :loading="saveChangesLoading"
              @click="handleSaveChanges"
            >
              Salvar alterações
            </v-btn>
          </v-col>
          
          <v-col>
            <v-btn
              color="error"
              class="white--text"
              width="100%"
              :loading="deleteAccountLoading"
              @click="handleDeleteAccount"
            >
              Excluir minha conta
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Authentication, { IAuthentication } from '@/services/authentication';
import Users, { IUsers } from '@/services/users';
import { StoreUser, FirestoreUser } from '@/types/users';

type TProfileChanges = {
  profilePhoto: File | null;
  profileBackgroundPhoto: File | null;
  username: string | null;
};

interface Data {
  authenticationService: IAuthentication | null;
  usersService: IUsers | null;
  allowEdit: boolean;
  lightTheme: boolean;
  changes: TProfileChanges;
  saveChangesLoading: boolean;
  deleteAccountLoading: boolean;
};

interface Methods {
  handleDeleteAccount: () => Promise<void>;
  handleSaveChanges: () => Promise<void>;
  getCurrentFirestoreUser: () => Promise<void>;
};

interface Computed {
  userId: string;
  user: StoreUser | null;
  profilePhoto: string;
  backgroundPhoto: string;
  username: string;
  firestoreUser: FirestoreUser | undefined;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    authenticationService: null,
    usersService: null,
    allowEdit: false,
    lightTheme: true,
    saveChangesLoading: false,
    deleteAccountLoading: false,
    changes: {
      username: null,
      profilePhoto: null,
      profileBackgroundPhoto: null
    },
  }),

  created () {
    this.authenticationService = new Authentication();
    this.lightTheme = !this.$vuetify.theme.dark;

    if (!!this.userId) {
      this.usersService = new Users(this.userId);
    };

    this.changes.username = this.username;
  },

  computed: {
    ...mapGetters(['user', 'firestoreUser']),

    profilePhoto () {
      return this.user?.firestoreUser.profile_photo || '';
    },

    backgroundPhoto () {
      return this.user?.firestoreUser.profile_background || '';
    },

    username () {
      return this.user?.firestoreUser.username || '';
    },

    userId () {
      return this.user?.firestoreUser.id || '';
    },
  },

  watch: {
    lightTheme (activeLightTheme: boolean) {
      this.$vuetify.theme.dark = !activeLightTheme;
    },
  },

  methods: {
    ...mapActions(['getCurrentFirestoreUser']),

    async handleDeleteAccount () {
      if (!this.firestoreUser || !this.firestoreUser.id || !this.firestoreUser.email) {
        return;
      };

      this.deleteAccountLoading = true;
      
      await this.authenticationService?.deleteAccount(
        this.firestoreUser.id,
        this.firestoreUser.email
      );
      
      this.deleteAccountLoading = false;
      
      this.$router.push('/');
    },

    async handleSaveChanges () {
      this.$nuxt.$loading.start();
      this.saveChangesLoading = true;

      if (!this.usersService) {
        return;
      };

      if (this.changes.username && this.changes.username !== this.username) {
        await this.usersService.changeUsername(
          this.changes.username
        );
      };

      if (this.changes.profilePhoto) {
        await this.usersService.changeProfilePhoto(
          this.changes.profilePhoto
        );
      };

      if (this.changes.profileBackgroundPhoto) {
        await this.usersService.changeProfileBackgroundPhoto(
          this.changes.profileBackgroundPhoto
        );
      };

      if (Object.values(this.changes).find(change => !!change)) {
        await this.getCurrentFirestoreUser();
      }

      this.$nuxt.$loading.finish();
      this.saveChangesLoading = false;

      this.$router.push(`/users/${this.userId}`);
    }
  }
});
</script>

<style lang="scss">
.avatarPhoto {
  transform: translateY(-99px) !important;
  border: 3px solid #FFF;
}

.photosArea ~ * {
  transform: translateY(-99px) !important;
}
</style>
