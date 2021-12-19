<template>
  <v-container>
    <v-row align="center" justify="center" class="mt-10">
      <v-col md="8" sm="10" cols="10" class="white">
        <v-row align="center" justify="center" class="photosArea">
          <v-col cols="12">
            <v-img
              width="100%"
              :height="backgroundPhotoLoaded ? '200px' : 0"
              class="overflow-hidden"
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
import Vue, { VueConstructor } from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Authentication, { IAuthentication } from '@/services/authentication';
import Users, { IUsers } from '@/services/users';
import { StoreUser } from '@/types/users';
import FirestoreUserData from '@/mixins/FirestoreUserData';

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
  backgroundPhotoLoaded: boolean;
  profilePhotoLoaded: boolean;
};

interface Methods {
  handleDeleteAccount: () => Promise<void>;
  handleSaveChanges: () => Promise<void>;
  getCurrentFirestoreUser: () => Promise<void>;
};

interface Computed {
  userId: string;
  user: StoreUser | null;
};

interface Props {};

export default (
  Vue as VueConstructor<Vue & InstanceType<typeof FirestoreUserData>>
).extend<Data, Methods, Computed, Props>({
  mixins: [FirestoreUserData],
  
  data: () => ({
    authenticationService: null,
    usersService: null,
    allowEdit: false,
    lightTheme: true,
    backgroundPhotoLoaded: false,
    profilePhotoLoaded: false,
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

    this.changes.username = this.firestoreUserUsername;
  },

  computed: {
    ...mapGetters(['user']),

    userId () {
      return this.user?.firestoreUser.id || '';
    },
  },

  watch: {
    async lightTheme (activeLightTheme: boolean) {
      this.$vuetify.theme.dark = !activeLightTheme;
      await this.usersService?.changeTheme(!activeLightTheme);
      await this.getCurrentFirestoreUser();
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

      if (this.changes.username && this.changes.username !== this.firestoreUserUsername) {
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
  border: 3px solid #FFF;
  transform: translateY(-99px) !important;
}

.photosArea ~ * {
  transform: translateY(-99px) !important;
}

.profilePhotoLoader {
  transform: translateY(-99px) !important;

  background-color: #FFF;
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
</style>
