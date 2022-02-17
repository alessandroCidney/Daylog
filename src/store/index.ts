import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';

import { getRedirectResult } from 'firebase/auth';
import { auth } from '@/plugins/firebase';

import Database from '@/services/database';

import { TApplicationMessage, TSnackbarMessage } from '@/types/messages';
import { StoreUser, FirestoreUser } from '@/types/users';

type TFetchUserPayload = Record<string, FirestoreUser> | undefined | null;

const usersDatabase = new Database('users');

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
    return !!this.user?.authUser;
  };

  get usernameIsSet () {
    return !!this.user?.firestoreUser?.username;
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

  @Action({ commit: 'setUser', rawError: true })
  async getCurrentFirestoreUser () {
    if (!this.user || !this.user.authUser) return null;

    const results = await usersDatabase.getWhere('email', this.user.authUser.email) as TFetchUserPayload;

    if (!results) return { ...this.user };

    const firestoreUser = Object.values(results)[0];

    return {
      authUser: this.user.authUser,
      firestoreUser
    };
  };

  @Action
  async checkGoogleAuthResults () {
    try {
      const redirectResult = await getRedirectResult(auth);

      if (redirectResult) {
        const savedUser = await usersDatabase.getWhere('email', redirectResult.user.email);

        if (!!savedUser) return false;

        const { user: { displayName: name, email, photoURL: profile_photo } } = redirectResult;

        const userKey = await usersDatabase.push({ name, email, profile_photo, created_at: new Date().getTime() });

        if (!userKey) return false;

        await usersDatabase.update({ id: userKey }, userKey);

        return true;
      };
    } catch (error) {
      console.log('Error during checkGoogleAuthResults execution', error);
      return false;
    }
  };
};
