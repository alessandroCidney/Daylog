import { Mixins, Component } from 'vue-property-decorator';

import OnFirestoreUserData from '@/mixins/OnFirestoreUserData';

import { FirestoreUser } from '@/types/users';

@Component
export default class OnPageUserData extends Mixins(OnFirestoreUserData) {
  pageUser: FirestoreUser | null | undefined = null;

  get pageUserId () {
    return this.pageUser?.id || '';
  };

  get pageUserUsername () {
    return this.pageUser?.username || '';
  };

  get pageUserEmail () {
    return this.pageUser?.email || '';
  };

  get pageUserProfilePhoto () {
    return this.pageUser?.profile_photo || '';
  };

  get pageUserBackgroundPicture () {
    return this.pageUser?.profile_background || '';
  };

  get pageUserIsLoggedUser () {
    if (!this.firestoreUser || !this.firestoreUserId || !this.pageUser || !this.pageUserId) return false;

    if (this.firestoreUserId === this.pageUserId) return true;

    return false;
  };
};