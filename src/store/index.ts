import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import Database from '@/services/database';

import { TApplicationMessage, TSnackbarMessage } from '~/types/messages';
import { StoreUser, FirestoreUser } from '@/types/users';

type TFetchUserPayload = Record<string, FirestoreUser> | undefined | null;

@Module
export default class IndexModule extends VuexModule {
  user: StoreUser | null = null;
  appMessage: TSnackbarMessage = {
    active: false,
    status: 'none',
    message: 'Potato',
  };

  get firestoreUser () {
    return this.user?.firestoreUser;
  };

  get isAuthenticated () {
    return !!this.user;
  };

  get usernameIsSet () {
    return !!this.user?.firestoreUser.username;
  };

  @Mutation
  setUser (payload: StoreUser | null) {
    this.user = payload;
  };

  @Mutation
  setAppMessage (payload: TSnackbarMessage) {
    this.appMessage = payload;
  };

  @Mutation
  showAppMessage (payload: TApplicationMessage | TSnackbarMessage) {
    const message = { ...payload, active: true };

    this.appMessage = message;
  };

  @Action({ commit: 'setUser' })
  async getCurrentFirestoreUser () {
    if (!this.user) return;

    const usersDatabase = new Database('users');
    const results = await usersDatabase.getWhere('email', this.user.firestoreUser.email) as TFetchUserPayload;
    
    if (!results) return;

    const user = Object.values(results)[0];

    return {
      ...this.user,
      firestoreUser: user
    };
  };
};
