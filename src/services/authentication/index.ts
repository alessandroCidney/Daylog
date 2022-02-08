import { auth } from '@/plugins/firebase';
import { AuthError } from 'firebase/auth';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
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
import { IAuthentication } from '@/types/services/authentication';

const googleAuthProvider = new GoogleAuthProvider();

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
    signUpEmail: string,
    signUpPassword: string,
    username: string,
    acceptedAll: boolean
  ): Promise<TApplicationMessage> {
    try {
      if (!acceptedAll) return ({ status: 'error', message: 'Accept the use terms, the privacy policy and the cookies use policy to sign up.'});

      const userCredentials = await createUserWithEmailAndPassword(this.auth, signUpEmail, signUpPassword);

      if (!userCredentials) return ({ status: 'error', message: 'An error ocurred during authentication.'});

      const { user: { displayName: name, email  } } = userCredentials;
      const userKey = await this.database.push({ name, email, username, acepted_terms: acceptedAll, acepted_privacy: acceptedAll});

      if (!userKey) return ({ status: 'error', message: 'An error ocurred during user registration' });

      const updated = await this.database.update({ id: userKey }, userKey);

      if (!updated) return ({ status: 'error', message: 'An error ocurred during user registration' });

      return ({ status: 'success', message: 'User registered successfully' });

    } catch (error: any) {
      console.log('Error on authentication service', error);

      if (!!error && !!error.code) {
        const authError = error as AuthError;
        return ({ status: 'error', message: this.utils.analiseFirebaseCode(authError.code) });
      };

      return ({ status: 'error', message: 'Unidentified error' });
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