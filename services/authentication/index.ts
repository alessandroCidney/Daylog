import { auth } from '@/plugins/firebase';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser
} from 'firebase/auth';
import Database, { IDatabase }  from '../database';
import CloudStorage, { ICloudStorage } from '../storage';
import Utils, { IUtils } from '@/utils';
import * as CloudStorageConstants from '@/data/constants/storage';

const googleAuthProvider = new GoogleAuthProvider();

export interface IAuthentication {
  database: IDatabase;
  storage: ICloudStorage;
  auth: Auth;
  utils: IUtils;
  signInWithGoogle: () => void;
  signOut: () => Promise<boolean>;
  signUpWithEmail: (
    email: string,
    password: string,
    username: string,
    profilePhoto: File | undefined,
    profileBackground: File | undefined,
    aceptedTerms: boolean,
    aceptedPrivacy: boolean,
  ) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  deleteAccount: () => Promise<void>;
};

class Authentication implements IAuthentication {
  database;
  auth;
  storage;
  utils;

  constructor () {
    this.auth = auth;
    this.database = new Database('users');
    this.storage = new CloudStorage('users');
    this.utils = new Utils();
  };

  signInWithGoogle () {
    signInWithRedirect(auth, googleAuthProvider);
  };

  async signUpWithEmail (
    email: string,
    password: string,
    username: string,
    profilePhoto: File | undefined,
    profileBackground: File | undefined,
    aceptedTerms: boolean,
    aceptedPrivacy: boolean,
  ) {
    try {
      if (!aceptedTerms || !aceptedPrivacy) {
        return false;
      };

      const userCredentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!!userCredentials) {
        const userKey = await this.database.push({
          name: userCredentials.user.displayName,
          email: userCredentials.user.email,
          username,
          acepted_terms: aceptedTerms,
          acepted_privacy: aceptedPrivacy
        });

        if (!userKey) {
          return false;
        }

        await this.database.update({
          id: userKey
        }, userKey);

        if (profilePhoto && profileBackground) {
          const renamedProfilePhoto = this.utils.renameFile(
            profilePhoto,
            CloudStorageConstants.USER_PROFILE_PHOTO_FILENAME
          );

          const renamedProfileBackgroundPhoto = this.utils.renameFile(
            profileBackground,
            CloudStorageConstants.USER_PROFILE_BACKGROUND_PHOTO_FILENAME
          );

          const profilePhotoURL = await this.storage.uploadFile(
            renamedProfilePhoto,
            userKey
          );

          const profileBackgroundURL = await this.storage.uploadFile(
            renamedProfileBackgroundPhoto,
            userKey
          );

          await this.database.update({
            profile_photo: profilePhotoURL,
            profile_background: profileBackgroundURL
          }, userKey);
        };

        return true;
      };

      return false;
    } catch (err) {
      console.log('Error on authentication service', err);
      return false;
    };
  };

  async signInWithEmail (email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!!userCredentials) {
        return true;
      };

      return false;
    } catch (err) {
      console.log('Error on authentication service', err);
      return false;
    };
  };

  async checkGoogleAuthResults () {
    const results = await getRedirectResult(auth);

    if (!results) {
      return;
    }

    const alreadyExists = await this.database.getWhere('email', results?.user.email);

    if (!!results && !alreadyExists) {
      const userKey = await this.database.push({
        name: results.user.displayName,
        email: results.user.email,
        profile_photo: results.user.photoURL,
        profile_background: null,
      });

      if (userKey) {
        await this.database.update({
          id: userKey
        }, userKey);
      }
    };
  };

  async signOut () {
    try {
      await signOut(auth);
      return true;
    } catch {
      return false;
    };
  };

  async deleteAccount () {
    async function deleteUserPosts (authorEmail: string) {
      const postsDatabase = new Database('posts');
      const postsStorage = new CloudStorage('posts');

      const postKeys = Object.keys(
        await postsDatabase.getWhere('author_email', authorEmail)
      );

      await Promise.all(postKeys.map((key) => postsDatabase.remove(key)));
      await Promise.all(postKeys.map((key) => postsStorage.deleteFiles(key)));
    };

    if (!auth.currentUser || !auth.currentUser.email) {
      return;
    }

    const userKey = Object.keys(
      await this.database.getWhere('email', auth.currentUser.email)
    )[0];

    const userEmail = auth.currentUser.email;

    /*await this.database.remove(userKey);
    await deleteUser(auth.currentUser);*/

    deleteUserPosts(userEmail);
  };
};

export default Authentication;