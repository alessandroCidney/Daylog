import { Middleware } from '@nuxt/types';

const authentication: Middleware = async ({ store, redirect, route }) => {
  const authenticated = store.getters.isAuthenticated;
  const loginOrSignUp = route.name === 'signIn' || route.name === 'signUp'

  if (loginOrSignUp && authenticated) {

    console.log('a')

    return redirect('/home');
  };

  if (authenticated && route.name === 'index') {
    return redirect('/home');
  };

  if (!authenticated && !loginOrSignUp) {
    return redirect('/signIn');
  };
};

export default authentication;