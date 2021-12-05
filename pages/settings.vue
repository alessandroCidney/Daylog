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
              label="Username"
              value="alessandrocidney"
              prefix="@"
              :disabled="!allowEdit"
            />
          </v-col>

          <v-col cols="6">
            <v-file-input
              prepend-icon="mdi-camera-plus"
              placeholder="Change profile photo"
              :disabled="!allowEdit"
            />
          </v-col>

          <v-col cols="6">
            <v-file-input
              prepend-icon="mdi-tooltip-image"
              placeholder="Change profile background photo"
              :disabled="!allowEdit"
            />
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="12">
            <v-btn
              color="space"
              class="white--text"
              width="100%"
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
import { mapGetters } from 'vuex';
import Authentication, { IAuthentication } from '@/services/authentication'
import { StoreUser } from '@/types/users';

interface Data {
  authenticationService: IAuthentication | null;
  allowEdit: boolean;
};
interface Methods {
  handleDeleteAccount: () => Promise<void>;
  handleSaveChanges: () => Promise<void>;
};

interface Computed {
  user: StoreUser | null;
  profilePhoto: string;
  backgroundPhoto: string;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  data: () => ({
    authenticationService: null,
    allowEdit: false,
  }),

  created () {
    this.authenticationService = new Authentication();
  },

  computed: {
    ...mapGetters(['user']),

    profilePhoto () {
      return this.user?.firestoreUser.profile_photo || '';
    },

    backgroundPhoto () {
      return this.user?.firestoreUser.profile_background || '';
    },
  },

  methods: {
    async handleDeleteAccount () {
      await this.authenticationService?.deleteAccount();
    },

    async handleSaveChanges () {
      alert('Save changes!')
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
