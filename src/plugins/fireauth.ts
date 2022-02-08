import { auth } from '@/plugins/firebase';
import { User } from 'firebase/auth';

import { AuthUser, StoreUser } from '@/types/users';
import { Plugin } from '@nuxt/types';

import _ from 'lodash';

const fireAuth: Plugin = ({ store }) => {

  return new Promise(async (resolve) => {
    await store.dispatch('checkGoogleAuthResults');

    auth.onAuthStateChanged(async (user: User | null) => {
      try {
        if (!user) {
          store.commit('setUser', null);
          return;
        };

        const { displayName, email  } = user;

        const authUser: AuthUser = { displayName, email };

        store.commit('setUser', { ...store.state.user, authUser } as StoreUser);
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