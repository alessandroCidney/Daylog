import { auth } from '@/plugins/firebase';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import Database, { IDatabase }  from '../database';

const googleAuthProvider = new GoogleAuthProvider();

export interface IAuthentication {
  database: IDatabase;
  auth: Auth;
  signInWithGoogle: () => void;
  signOut: () => Promise<boolean>;
  signUpWithEmail: (email: string, password: string) => Promise<boolean>;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
};

class Authentication implements IAuthentication {
  database;
  auth;

  constructor () {
    this.auth = auth;
    this.database = new Database('users');
  };

  signInWithGoogle () {
    signInWithRedirect(auth, googleAuthProvider);
  };

  async signUpWithEmail (email: string, password: string) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!!userCredentials) {
        await this.database.push({
          name: userCredentials.user.displayName,
          email: userCredentials.user.email
        });

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

    const alreadyExists = await this.database.getWhere('email', results?.user.email);

    if (!!results && !alreadyExists) {
      await this.database.push({
        name: results.user.displayName,
        email: results.user.email
      });
    };
  };

  async signOut () {
    try {
      await signOut(auth);
      return true;
    } catch {
      return false;
    };
  }
};

export default Authentication;