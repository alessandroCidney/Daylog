import { Vue, Component } from 'vue-property-decorator';
import { Getter } from 'vuex-class';
import { FirestoreUser } from '@/types/users';

@Component
export default class FirestoreUserData extends Vue {
  @Getter firestoreUser!: FirestoreUser | null | undefined;

  get firestoreUserId () {
    return this.firestoreUser?.id || '';
  };

  get firestoreUserName () {
    return this.firestoreUser?.name || '';
  };

  get firestoreUserEmail () {
    return this.firestoreUser?.email || '';
  };

  get firestoreUserProfilePhoto () {
    return this.firestoreUser?.profile_photo || '';
  };

  get firestoreUserProfileBackground () {
    return this.firestoreUser?.profile_background || '';
  };

  get firestoreUserUsername () {
    return this.firestoreUser?.username || '';
  };

  get firestoreUserSavedPosts () {
    return this.firestoreUser?.savedPosts || [];
  };
};