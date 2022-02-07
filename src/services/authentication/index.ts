import { auth } from '@/plugins/firebase';
import { AuthError } from 'firebase/auth';
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

import { TPost } from '@/types/posts';
import { TApplicationMessage } from '@/types/messages';

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
  signInWithEmail: (email: string, password: string) => Promise<TApplicationMessage>;
  deleteAccount: (userId: string, userEmail: string) => Promise<void>;
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
        return {
          status: 'success',
          message: 'User successfully authenticated.'
        } as TApplicationMessage;
      };

      return {
        status: 'error',
        message: 'An error occurred during authentication.'
      } as TApplicationMessage;
    } catch (err) {
      const authError = err as AuthError;

      console.log('Error on authentication service', err);
      
      return {
        status: 'error',
        message: this.utils.analiseFirebaseCode(authError.code)
      } as TApplicationMessage;
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

  async deleteAccount (userId: string, userEmail: string) {
    async function deleteUserPosts (authorEmail: string) {
      const postsDatabase = new Database('posts');
      const postsStorage = new CloudStorage('posts');

      const userPosts = await postsDatabase
        .getWhere('author_email', authorEmail) as Record<string, TPost> | undefined | null; 
      
      if (!userPosts) {
        return;
      };

      const postKeys = Object.keys(userPosts);

      if (postKeys.length === 0) {
        return;
      };

      await Promise.all(postKeys.map((key) => postsDatabase.remove(key)));
      await Promise.all(postKeys.map((key) => postsStorage.deleteFiles(key)));
    };

    try {
      if (!auth.currentUser) {
        throw new Error('User not found');
      }
  
      await deleteUserPosts(userEmail);
      await this.database.remove(userId);
      await this.storage.deleteFiles(userId);
      await deleteUser(auth.currentUser);
    } catch (error) {
      console.log('Error on authentication service (DELETE USER)', error);
    };
  };
};

export default Authentication;