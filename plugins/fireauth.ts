import { Plugin } from '@nuxt/types';
import { auth } from './firebase';
import Authentication from '../services/authentication';
import Database from '../services/database';
import { FirestoreUser } from '@/types/users';

const fireAuth: Plugin = (context) => {
  const { store } = context;
  const database = new Database('users');
  const authentication = new Authentication();

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      
      if (!user) {
        store.commit('setUser', null);
        resolve();
        return;
      };

      authentication.checkGoogleAuthResults().then(() => {
        database.getWhere('email', user?.email)
          .then((firestoreUser) => {
            
            const storeUser = {
              authUser: user,
              firestoreUser: {
                ...(Object.values(firestoreUser)[0] as FirestoreUser)
              }
            };
            
            store.commit('setUser', storeUser);
            resolve();
          }).catch((err) => {
            console.log('Error on fireauth plugin', err);

            store.commit('setUser', null);
            resolve();
            return;
          });
      });
    });
  });
};

export default fireAuth;