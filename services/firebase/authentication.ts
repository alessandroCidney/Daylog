import { 
  GoogleAuthProvider, 
  getAuth , 
  signInWithRedirect,
  UserCredential,
  onAuthStateChanged
} from 'firebase/auth';

export interface IGoogleAuthentication {
  provider: GoogleAuthProvider;
  authWithGoogleRedirect: () => void;
};

class GoogleAuthentication implements IGoogleAuthentication {
  provider;

  constructor () {
    const auth = getAuth();
    this.provider = new GoogleAuthProvider();

    onAuthStateChanged(auth, (user) => {
      console.log('STAATEEE CHANGEED', user)
    });
  };

  async authWithGoogleRedirect () {
    const auth = getAuth();
    let results = null;

    await signInWithRedirect(auth, this.provider);
  };
};

export {
  GoogleAuthentication
};