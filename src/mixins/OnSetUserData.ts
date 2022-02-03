import { Component, Mixins } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import OnFirestoreUserData from '@/mixins/OnFirestoreUserData';
import Users, { IUsers } from '~/services/users';

type TProfileChanges = {
  profilePhoto: File | null;
  profileBackgroundPhoto: File | null;
  username: string | null;
};

@Component
export default class OnSetUserData extends Mixins(OnFirestoreUserData) {
  usersService: IUsers | null = null;
  saveChangesLoading = false;
  changes: TProfileChanges = {
    username: null,
    profilePhoto: null,
    profileBackgroundPhoto: null
  };
  
  @Action getCurrentFirestoreUser!: () => Promise<void>;

  created () {
    if (this.firestoreUserId) this.usersService = new Users(this.firestoreUserId);
  };

  async handleSaveChanges () {
    this.$nuxt.$loading.start();
    this.saveChangesLoading = true;

    if (this.changes.username && this.changes.username !== this.firestoreUserUsername) {
      await this.usersService?.changeUsername(
        this.changes.username
      );
    };

    if (this.changes.profilePhoto) {
      await this.usersService?.changeProfilePhoto(
        this.changes.profilePhoto
      );
    };

    if (this.changes.profileBackgroundPhoto) {
      await this.usersService?.changeProfileBackgroundPhoto(
        this.changes.profileBackgroundPhoto
      );
    };

    if (Object.values(this.changes).find(change => !!change)) {
      await this.getCurrentFirestoreUser();
    };

    this.$nuxt.$loading.finish();
    this.saveChangesLoading = false;

    this.$router.push(`/users/${this.firestoreUserId}`);
  };
};