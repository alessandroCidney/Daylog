import { auth } from '@/plugins/firebase';
import { User } from 'firebase/auth';

import { AuthUser } from '@/types/users';
import { Plugin } from '@nuxt/types';

import _ from 'lodash';

const fireAuth: Plugin = (context) => {
  const { store } = context;

  return new Promise(async (resolve) => {
    await store.dispatch('checkGoogleAuthResults');

    auth.onAuthStateChanged(async (user: User | null) => {
      try {
        if (!user) {
          store.commit('setUser', null);
          return;
        };

        const { displayName, email  } = user;
  
        store.commit('setUser', { authUser: ({ displayName, email }) as AuthUser });

        await store.dispatch('getCurrentFirestoreUser');

      } catch (error) {
        console.log('Error on fireauth plugin', error);
        store.commit('setUser', null);
      
      } finally {
        resolve()
      };
    });
  });
};

export default fireAuth;