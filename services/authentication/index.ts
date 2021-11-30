import { auth } from '@/plugins/firebase';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  Auth,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import Database, { IDatabase }  from '../database';

const googleAuthProvider = new GoogleAuthProvider();

export interface IAuthentication {
  database: IDatabase;
  auth: Auth;
  signInWithGoogle: () => void;
  signOut: () => Promise<boolean>;
  signUpWithEmailAndPassword: (email: string, password: string) => Promise<boolean>;
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
  }

  async signUpWithEmailAndPassword (email: string, password: string) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      if (!!userCredentials) {
        await this.database.setIfNotExists({
          name: userCredentials.user.displayName
        }, 'teste_email');
      };

      return true;
    } catch (err) {
      console.log('Error on authentication service', err);
      return false;
    };
  };

  async checkGoogleAuthResults () {
    const results = await getRedirectResult(auth);

    if (!!results) {
      await this.database.setIfNotExists({
        name: results.user.displayName,
      }, 'teste_google')
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