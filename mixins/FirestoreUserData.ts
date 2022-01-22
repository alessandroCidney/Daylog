import Vue from 'vue';
import { mapGetters } from 'vuex';
import { FirestoreUser } from '@/types/users';

interface Data {};
interface Methods {};

export interface Computed {
  firestoreUser: FirestoreUser | null;
  firestoreUserId: string;
  firestoreUserName: string;
  firestoreUserEmail: string;
  firestoreUserProfilePhoto: string;
  firestoreUserProfileBackground: string;
  firestoreUserUsername: string;
};

interface Props {};

export default Vue.extend<Data, Methods, Computed, Props>({
  computed: {
    ...mapGetters(['firestoreUser']),

    firestoreUserId () {
      return this.firestoreUser?.id || '';
    },

    firestoreUserName () {
      return this.firestoreUser?.name || '';
    },

    firestoreUserEmail () {
      return this.firestoreUser?.email || '';
    },

    firestoreUserProfilePhoto () {
      return this.firestoreUser?.profile_photo || '';
    },

    firestoreUserProfileBackground () {
      return this.firestoreUser?.profile_background || '';
    },

    firestoreUserUsername () {
      return this.firestoreUser?.username || '';
    }
  }
});