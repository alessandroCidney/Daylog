import { Middleware } from '@nuxt/types';
import Authentication from '@/services/authentication';

const authentication: Middleware = async ({ store, redirect, route }) => {
  const authenticated = store.getters.isAuthenticated;
  const loginOrSignUp = route.name === 'signIn' || route.name === 'signUp'

  if (loginOrSignUp && authenticated) {
    const auth = new Authentication();
    await auth.checkGoogleAuthResults();

    return redirect('/home');
  }

  if (authenticated && route.name === 'index') {
    return redirect('/home');
  }

  if (!authenticated && !loginOrSignUp) {
    return redirect('/signIn');
  };
};

export default authentication;