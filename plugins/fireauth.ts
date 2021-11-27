import { Plugin } from '@nuxt/types';
import { auth } from './firebase';

const fireAuth: Plugin = (context) => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      store.commit('setUser', user);
      resolve();
    });
  });
};

export default fireAuth;