import { auth } from '@/plugins/firebase';
import { GoogleAuthProvider, signInWithRedirect, signOut } from 'firebase/auth';

const googleAuthProvider = new GoogleAuthProvider();

export interface IAuthentication {
  signInWithGoogle: () => void;
  signOut: () => Promise<boolean>;
};

class Authentication implements IAuthentication {
  signInWithGoogle () {
    signInWithRedirect(auth, googleAuthProvider)
  }

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