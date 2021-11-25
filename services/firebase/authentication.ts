import { 
  GoogleAuthProvider, 
  getAuth , 
  signInWithRedirect, 
  getRedirectResult,
  UserCredential
} from 'firebase/auth';

export interface IGoogleAuthentication {
  provider: GoogleAuthProvider;
  authWithGoogleRedirect: () => void;
  getGoogleAuthResults: () => Promise<UserCredential | null>;
};

class GoogleAuthentication implements IGoogleAuthentication {
  provider;

  constructor () {
    this.provider = new GoogleAuthProvider();
  };

  async authWithGoogleRedirect () {
    const auth = getAuth();
    let results = null;

    await signInWithRedirect(auth, this.provider);
  };

  async getGoogleAuthResults () {
    const auth = getAuth();
    const results = await getRedirectResult(auth);

    return results;
  }
};

export {
  GoogleAuthentication
};