import { auth } from '@/plugins/firebase';
import {
  GoogleAuthProvider,
  signInWithRedirect,
  signOut,
  getRedirectResult,
  Auth
} from 'firebase/auth';
import Database, { IDatabase }  from '../database';

const googleAuthProvider = new GoogleAuthProvider();

export interface IAuthentication {
  database: IDatabase;
  auth: Auth;
  signInWithGoogle: () => void;
  signOut: () => Promise<boolean>;
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

  async checkGoogleAuthResults () {
    const results = await getRedirectResult(auth);

    if (!!results) {
      console.log('FUIII CHAAMMAAADOOO')
      
      await this.database.setIfNotExists({
        name: results.user.displayName,
      }, 'teste')
    };

    console.log('REDIRECT_RESULT', results);
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